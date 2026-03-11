-- ================================================================
-- ConstructAI — Supabase Schema
-- Run this in Supabase Dashboard → SQL Editor
-- ================================================================

-- ── Conversații ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS conversations (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    TEXT        NOT NULL,
  locale        TEXT        NOT NULL DEFAULT 'ro',
  started_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at      TIMESTAMPTZ,
  message_count INT         NOT NULL DEFAULT 0,
  metadata      JSONB       DEFAULT '{}'
);

CREATE INDEX idx_conversations_session ON conversations(session_id);
CREATE INDEX idx_conversations_started ON conversations(started_at DESC);

-- ── Mesaje ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID        NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role            TEXT        NOT NULL CHECK (role IN ('user', 'assistant')),
  content         TEXT        NOT NULL,
  tokens_used     INT,
  latency_ms      INT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_created      ON messages(created_at DESC);

-- ── Events UI ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  TEXT        NOT NULL,
  event_type  TEXT        NOT NULL,
  payload     JSONB       DEFAULT '{}',
  locale      TEXT        NOT NULL DEFAULT 'ro',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_events_session ON events(session_id);
CREATE INDEX idx_events_type    ON events(event_type);
CREATE INDEX idx_events_created ON events(created_at DESC);

-- ── Erori ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS error_logs (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  TEXT,
  error_type  TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  stack       TEXT,
  context     JSONB       DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_errors_type    ON error_logs(error_type);
CREATE INDEX idx_errors_created ON error_logs(created_at DESC);

-- ================================================================
-- Views pentru dashboard
-- ================================================================

CREATE OR REPLACE VIEW daily_conversations AS
SELECT
  DATE(started_at) AS day,
  COUNT(*) AS total,
  AVG(message_count)::NUMERIC(10,1) AS avg_messages
FROM conversations
WHERE started_at > now() - INTERVAL '30 days'
GROUP BY DATE(started_at)
ORDER BY day DESC;

CREATE OR REPLACE VIEW top_events AS
SELECT
  event_type,
  COUNT(*) AS total,
  COUNT(DISTINCT session_id) AS unique_sessions
FROM events
WHERE created_at > now() - INTERVAL '30 days'
GROUP BY event_type
ORDER BY total DESC;

-- RLS dezactivat — acces doar server-side prin service_role key
ALTER TABLE conversations DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages      DISABLE ROW LEVEL SECURITY;
ALTER TABLE events        DISABLE ROW LEVEL SECURITY;
ALTER TABLE error_logs    DISABLE ROW LEVEL SECURITY;

-- ── Devize ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS devize (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id     TEXT,
  client_name    TEXT,
  project_name   TEXT,
  locale         TEXT        NOT NULL DEFAULT 'ro',
  items          JSONB       NOT NULL DEFAULT '[]',
  total_mat      NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_manopera NUMERIC(10,2) NOT NULL DEFAULT 0,
  total          NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_devize_session   ON devize(session_id);
CREATE INDEX idx_devize_created   ON devize(created_at DESC);

ALTER TABLE devize DISABLE ROW LEVEL SECURITY;