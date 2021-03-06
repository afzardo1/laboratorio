<?php
/*SELECIONA REGISTROS*/
	$GetRegTenan = '
		SELECT
			tenant_cada_iden,
			tenant_cada_docu,
			tenant_cada_docu_esta,
			tenant_cada_nome,
			tenant_cada_cep,
			tenant_cada_ende,
			tenant_cada_nume,
			tenant_cada_bairo,
			tenant_cada_cida,
			tenant_cada_esta,
			tenant_cada_usua_iden,
			tenant_cada_perso_certi,
			CONCAT( usua_cada_nome, " - ", tenant_cada_usua_iden ) AS tenant_cada_usua_nome_iden,
			tenant_cada_stat
		FROM
			sist_tenant_cada
		LEFT JOIN
			sist_usua_cada
		ON
			( usua_cada_iden = tenant_cada_usua_iden )
		WHERE
			tenant_cada_docu LIKE :tenant_cada_docu OR
			tenant_cada_nome LIKE :tenant_cada_nome AND
			tenant_cada_stat LIKE :tenant_cada_stat
	';

/*SELECIONA REGISTROS USUARIOS*/
	$GetRegUsuaTenan = '
		SELECT
			usua_cada_iden,
			usua_cada_nome
		FROM
			sist_usua_cada
		WHERE
			usua_cada_tipo = "ADMINISTRADOR TENANT" AND
			usua_cada_status LIKE :usua_cada_status
		ORDER BY
			usua_cada_nome
	';

/*SELECIONA DUPLICADOS*/
	$DuplRegTenan = '
		SELECT
			COUNT( tenant_cada_iden ) AS tenant_cada_iden
		FROM
			sist_tenant_cada
		WHERE
			tenant_cada_iden <> :tenant_cada_iden AND
			tenant_cada_docu = :tenant_cada_docu
	'; 

/*INSERT REGISTROS*/
	$InstRegTenan = '
		INSERT INTO sist_tenant_cada (
			tenant_cada_docu,
			tenant_cada_docu_esta,
			tenant_cada_nome,
			tenant_cada_cep,
			tenant_cada_ende,
			tenant_cada_nume,
			tenant_cada_bairo,
			tenant_cada_cida,
			tenant_cada_esta,
			tenant_cada_perso_certi,
			tenant_cada_usua_iden,
			tenant_cada_stat
		) VALUES (
			:tenant_cada_docu,
			:tenant_cada_docu_esta,
			:tenant_cada_nome,
			:tenant_cada_cep,
			:tenant_cada_ende,
			:tenant_cada_nume,
			:tenant_cada_bairo,
			:tenant_cada_cida,
			:tenant_cada_esta,
			:tenant_cada_usua_iden,
			:tenant_cada_stat
		);
	';

/*UPDATE REGISTROS*/
	$UpdtRegTenan = '
		UPDATE sist_tenant_cada SET 
			tenant_cada_docu = :tenant_cada_docu,
			tenant_cada_docu_esta = :tenant_cada_docu_esta,
			tenant_cada_nome = :tenant_cada_nome,
			tenant_cada_cep = :tenant_cada_cep,
			tenant_cada_ende = :tenant_cada_ende,
			tenant_cada_nume = :tenant_cada_nume,
			tenant_cada_bairo = :tenant_cada_bairo,
			tenant_cada_cida = :tenant_cada_cida,
			tenant_cada_esta = :tenant_cada_esta,
			tenant_cada_perso_certi = :tenant_cada_perso_certi,
			tenant_cada_usua_iden = :tenant_cada_usua_iden,
			tenant_cada_stat = :tenant_cada_stat
		WHERE
			tenant_cada_iden = :tenant_cada_iden
	'; 

/*DELETE REGISTRO*/
	$DeleRegTenan = '
		DELETE FROM
			sist_tenant_cada
		WHERE
			tenant_cada_iden = :tenant_cada_iden
	';

/*SELECIONA REGISTROS PARA TERCEIROS*/
	$GetRegTenanTerce = '
		SELECT
			tenant_cada_iden,
			tenant_cada_nome
		FROM
			sist_tenant_cada
		WHERE
			tenant_cada_stat LIKE :tenant_cada_stat
	';

/*SELECIONA CERTIFICADOP PERSONALIZADO*/
	$GetRegTenanCertiPerso = '
		SELECT
			tenant_cada_iden,
			tenant_cada_docu,
			tenant_cada_perso_certi
		FROM
			sist_tenant_cada
		WHERE
			tenant_cada_iden = :tenant_cada_iden
	';

?>