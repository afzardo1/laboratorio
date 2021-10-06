<?php
/*SELECIONA REGISTROS*/
	$GetRegUsua = '
		SELECT
			usua_cada_iden,
			usua_cada_nome,
			usua_cada_tipo,
			usua_cada_login,
			usua_cada_status,
			usua_cada_tenant,
			usua_cada_empre,
			usua_cada_adm
		FROM
			sist_usua_cada
		WHERE
			usua_cada_nome LIKE :usua_cada_nome_login AND
			usua_cada_login LIKE :usua_cada_nome_login AND
			usua_cada_tenant LIKE :usua_cada_tenant AND
			usua_cada_empre LIKE :usua_cada_empre
	';

/*SELECIONA DUPLICADOS*/
	$DuplRegUsua = '
		SELECT
			COUNT( usua_cada_iden ) AS usua_cada_iden
		FROM
			sist_usua_cada
		WHERE
			usua_cada_iden <> :usua_cada_iden AND
			usua_cada_login = :usua_cada_nome_login
	'; 

/*INSERT REGISTROS*/
	$InstRegUsua = '
		INSERT INTO sist_usua_cada (
			usua_cada_nome,
			usua_cada_tipo,
			usua_cada_login,
			usua_cada_status,
			usua_cada_tenant,
			usua_cada_empre,
			usua_cada_troca_senha,
			usua_cada_adm
		) VALUES (
			:usua_cada_nome,
			:usua_cada_tipo,
			:usua_cada_login,
			:usua_cada_status,
			:usua_cada_tenant,
			:usua_cada_empre,
			1,
			1
		);
	';

/*UPDATE REGISTROS*/
	$UpdtRegUsua = '
		UPDATE sist_usua_cada SET 
			usua_cada_nome = :usua_cada_nome,
			usua_cada_tipo = :usua_cada_tipo,
			usua_cada_login = :usua_cada_login,
			usua_cada_status = :usua_cada_status,
			usua_cada_tenant = :usua_cada_tenant,
			usua_cada_empre = :usua_cada_empre
		WHERE
			usua_cada_iden = :usua_cada_iden
	'; 

/*UPDATE SENHA*/
	$UpdtSenhUsua = '
		UPDATE sist_usua_cada SET 
			usua_cada_senha = :usua_cada_senha,
			usua_cada_troca_senha = 1
		WHERE
			usua_cada_iden = :usua_cada_iden
	';

/*DELETE REGISTRO*/
	$DeleRegUsua = '
		DELETE FROM
			sist_usua_cada
		WHERE
			usua_cada_iden = :usua_cada_iden
	';
	
/*SELECIONA PERMISSÃO*/
	$GetRegPermUsua = '
		SELECT
			usua_aces_cada_iden,
			usua_aces_cada_usua_iden,
			usua_aces_cada_opca_iden,
			usua_aces_cada_opca_stat
		FROM
			sist_usua_aces_cada
		WHERE
			usua_aces_cada_usua_iden = :usua_aces_cada_usua_iden
	';

/*CHECA PERMISSÃO*/
	$ChkRegPermUsua = '
		SELECT
			COUNT( usua_aces_cada_iden ) AS usua_aces_cada_iden
		FROM
			sist_usua_aces_cada
		WHERE
			usua_aces_cada_usua_iden = :usua_aces_cada_usua_iden AND
			usua_aces_cada_opca_iden = :usua_aces_cada_opca_iden
	';

/*INSERT PERMISSÃO*/
	$InstPermUsua = '
		INSERT INTO sist_usua_aces_cada (
			usua_aces_cada_usua_iden,
			usua_aces_cada_opca_iden,
			usua_aces_cada_opca_stat
		) VALUES (
			:usua_aces_cada_usua_iden,
			:usua_aces_cada_opca_iden,
			:usua_aces_cada_opca_stat
		);
	';

/*UPDATE PERMISSAO*/
	$UpdtPermUsua = '
		UPDATE sist_usua_aces_cada SET 
			usua_aces_cada_opca_stat = :usua_aces_cada_opca_stat
		WHERE
			usua_aces_cada_usua_iden = :usua_aces_cada_usua_iden AND
			usua_aces_cada_opca_iden = :usua_aces_cada_opca_iden
	';

/*VALIDA PERMISSÃO*/
	$SelValiPermUsua = '
		SELECT
			COUNT( usua_aces_cada_iden ) AS usua_aces_cada_iden
		FROM
			sist_usua_aces_cada
		WHERE
			usua_aces_cada_usua_iden = :usua_aces_cada_usua_iden AND
			usua_aces_cada_opca_iden = :usua_aces_cada_opca_iden AND
			usua_aces_cada_opca_stat = 1
	';

/*SELECIONA REGISTROS TERCEIROS*/
	$GetTercRegUsua = '
		SELECT
			usua_cada_iden,
			usua_cada_nome
		FROM
			sist_usua_cada
		WHERE
			usua_cada_status LIKE :usua_cada_status AND
			usua_cada_tenant LIKE :usua_cada_tenant AND
			usua_cada_empre LIKE :usua_cada_empre
	';
?>