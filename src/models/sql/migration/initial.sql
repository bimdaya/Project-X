BEGIN;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phoneNumber VARCHAR(64) UNIQUE NOT NULL,
		firstName VARCHAR(64) NOT NULL,
		surname VARCHAR(64) NOT NULL
);

/* For testing purpose. :) */
TRUNCATE public.clients CASCADE;


INSERT INTO public.clients (phoneNumber, firstName, surname)
VALUES ('+44076546546545', 'FName', 'LName');

/* testing end */
COMMIT;
