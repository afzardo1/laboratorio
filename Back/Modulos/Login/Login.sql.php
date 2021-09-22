<?php
	/*CHECA USUÁRIOS*/
	$GetRegLogin = '
		SELECT
			usua_cada_iden,
			usua_cada_nome,
			usua_cada_tipo,
			usua_cada_login,
			usua_cada_tenant,
			usua_cada_empre,
			usua_cada_troca_senha
		FROM
			usua_cada
		WHERE
			usua_cada_login = :usua_cada_login AND
			usua_cada_senha = :usua_cada_senha AND
			usua_cada_status = 1
	';

	/*UPDATE SENHA*/
	$UpdtSenhLogi = '
		UPDATE usua_cada SET 
			usua_cada_senha = :usua_cada_senha,
			usua_cada_troca_senha = 0
		WHERE
			usua_cada_iden = :usua_cada_iden
	';

	/*RETORNA USUÁRIO*/
	$RetRegLogin = '
		SELECT
			usua_cada_iden,
			usua_cada_nome,
			usua_cada_tipo,
			usua_cada_login,
			usua_cada_tenant,
			usua_cada_empre,
			usua_cada_troca_senha
		FROM
			usua_cada
		WHERE
			usua_cada_iden = :usua_cada_iden AND
			usua_cada_status = 1
	';
?>