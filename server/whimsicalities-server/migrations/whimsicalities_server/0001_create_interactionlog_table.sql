CREATE TABLE interactionlog (
    log_id UUID DEFAULT gen_random_uuid(),
    message TEXT,
    time TIMESTAMP,
    PRIMARY KEY (log_id)
);