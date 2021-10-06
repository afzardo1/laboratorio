<?php	
/*SELECIONA REGISTROS*/
	$GetRegEmpre = '
		SELECT
			empre_cada_iden,
			empre_cada_docu,
			empre_cada_docu_esta,
			empre_cada_nome,
			empre_cada_cep,
			empre_cada_ende,
			empre_cada_nume,
			empre_cada_bairo,
			empre_cada_cida,
			empre_cada_esta,
			empre_cada_usua_iden,
			CONCAT( usua_cada_nome, " - ", empre_cada_usua_iden ) AS empre_cada_usua_nome_iden,
			empre_cada_stat,
			empre_cada_tenant
		FROM
			sist_empre_cada
		LEFT JOIN
			sist_usua_cada
		ON
			( usua_cada_iden = empre_cada_usua_iden )
		WHERE
			( empre_cada_docu LIKE :empre_cada_docu OR
			  empre_cada_nome LIKE :empre_cada_nome ) AND
			empre_cada_tenant LIKE :empre_cada_tenant
	';

/*SELECIONA REGISTROS USUARIOS*/
	$GetRegUsuaEmpre = '
		SELECT
			usua_cada_iden,
			usua_cada_nome
		FROM
			sist_usua_cada
		WHERE
			usua_cada_tenant LIKE :usua_cada_tenant AND
			usua_cada_status LIKE :usua_cada_status
		ORDER BY
			usua_cada_nome
	';

/*SELECIONA DUPLICADOS*/
	$DuplRegEmpre = '
		SELECT
			COUNT( empre_cada_iden ) AS empre_cada_iden
		FROM
			sist_empre_cada
		WHERE
			empre_cada_iden <> :empre_cada_iden AND
			empre_cada_docu = :empre_cada_docu
	'; 

/*INSERT REGISTROS*/
	$InstRegEmpre = '
		INSERT INTO sist_empre_cada (
			empre_cada_docu,
			empre_cada_docu_esta,
			empre_cada_nome,
			empre_cada_cep,
			empre_cada_ende,
			empre_cada_nume,
			empre_cada_bairo,
			empre_cada_cida,
			empre_cada_esta,
			empre_cada_usua_iden,
			empre_cada_stat,
			empre_cada_tenant
		) VALUES (
			:empre_cada_docu,
			:empre_cada_docu_esta,
			:empre_cada_nome,
			:empre_cada_cep,
			:empre_cada_ende,
			:empre_cada_nume,
			:empre_cada_bairo,
			:empre_cada_cida,
			:empre_cada_esta,
			:empre_cada_usua_iden,
			:empre_cada_stat,
			:empre_cada_tenant
		);
	';

/*UPDATE REGISTROS*/
	$UpdtRegEmpre = '
		UPDATE sist_empre_cada SET 
			empre_cada_docu = :empre_cada_docu,
			empre_cada_docu_esta = :empre_cada_docu_esta,
			empre_cada_nome = :empre_cada_nome,
			empre_cada_cep = :empre_cada_cep,
			empre_cada_ende = :empre_cada_ende,
			empre_cada_nume = :empre_cada_nume,
			empre_cada_bairo = :empre_cada_bairo,
			empre_cada_cida = :empre_cada_cida,
			empre_cada_esta = :empre_cada_esta,
			empre_cada_usua_iden = :empre_cada_usua_iden,
			empre_cada_stat = :empre_cada_stat,
			empre_cada_tenant = :empre_cada_tenant
		WHERE
			empre_cada_iden = :empre_cada_iden
	'; 

/*DELETE REGISTRO*/
	$DeleRegEmpre = '
		DELETE FROM
			sist_empre_cada
		WHERE
			empre_cada_iden = :empre_cada_iden
	';

/*SELECIONA REGISTROS TENANTS*/
	$GetRegTenanEmpre = '
		SELECT
			tenant_cada_iden,
			tenant_cada_nome
		FROM
			sist_tenant_cada
		WHERE
			tenant_cada_stat LIKE :tenant_cada_stat
	';

/*SELECIONA REGISTROS TERCEIROS*/
	$GetRegEmpreTerce = '
		SELECT
			empre_cada_iden,
			empre_cada_nome
		FROM
			sist_empre_cada
		WHERE
			empre_cada_stat LIKE :empre_cada_stat AND
			empre_cada_tenant LIKE :empre_cada_tenant
	';

?>