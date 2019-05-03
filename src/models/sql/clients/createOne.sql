INSERT INTO public.clients(
	phoneNumber,
	firstName,
	surName
) VALUES (
	${phoneNumber},
	${firstName},
	${surname}
) RETURNING id AS client
