ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all" ON todos
  FOR ALL
  USING (true);