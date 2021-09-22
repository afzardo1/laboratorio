<?php
/*SELECIONA REGISTROS*/
	$GetRegDobra = '
		SELECT
			amos_cada_iden,
			amos_cada_regi,
			amos_cada_orse,
			clie_cada_nome,
			fabr_cada_nome,
			mate_cada_descr,
			area_cada_descr,
			amos_cada_emis,
			amos_cada_descr,
			amos_cada_tenan,
			amos_cada_empre,
			IF( amos_cada_dobram_2cps = 1,"LABORATÓRIO", IF( amos_cada_dobram_4cps = 1,"LABORATÓRIO", "CAMPO" ) ) AS amos_cada_local,
			IF( amos_cada_dobram_2cps = 1,"DOBRAMENTO 2CPS", IF( amos_cada_dobram_4cps = 1,"DOBRAMENTO 4CPS", "" ) ) AS amos_cada_tipo,
			IFNULL( amos_dobra_cada_iden, "Automatico" ) AS amos_dobra_cada_iden,
			IFNULL( amos_dobra_cada_qtde, 1 ) AS amos_dobra_cada_qtde,
			IFNULL( amos_dobra_cada_result, -1 ) AS amos_dobra_cada_result,
			amos_dobra_cada_obs,
			IFNULL( amos_dobra_cada_fina, 0 ) AS amos_dobra_cada_fina,
			amos_dobra_cada_fina_data,
			amos_dobra_cada_fina_usua_iden,
			usua_cada_nome,
			sis_para_logo,
			sis_para_selo
		FROM
			amos_cada
		LEFT JOIN
			amos_dobra_cada
		ON
			( amos_dobra_cada_amos_iden = amos_cada_iden )
		LEFT JOIN
			clie_cada
		ON
			( clie_cada_iden = amos_cada_clie_iden )
		LEFT JOIN
			fabr_cada
		ON
			( fabr_cada_iden = amos_cada_fabr_iden )
		LEFT JOIN
			mate_cada
		ON
			( mate_cada_iden = amos_cada_mate_iden )
		LEFT JOIN
			area_cada
		ON
			( area_cada_iden = amos_cada_area_iden )
		LEFT JOIN
			tenant_cada
		ON
			( tenant_cada_iden = amos_cada_tenan )
		LEFT JOIN
			usua_cada
		ON
			( usua_cada_iden = amos_dobra_cada_fina_usua_iden )
		LEFT JOIN
			sist_para
		ON
			( sist_para_tenant = amos_cada_tenan AND
			  sist_para_empre = amos_cada_empre )
		WHERE
			( amos_cada_dobram_2cps = 1 OR
			  amos_cada_dobram_4cps = 1 ) AND
			:FILTRO			
	';

/*INSERT REGISTROS*/
	$InstRegDobra = '
		INSERT INTO amos_dobra_cada (
			amos_dobra_cada_amos_iden,
			amos_dobra_cada_qtde,
			amos_dobra_cada_result,
			amos_dobra_cada_obs,
			amos_dobra_cada_fina,
			amos_dobra_cada_fina_data,
  			amos_dobra_cada_fina_usua_iden
		) VALUES (
			:amos_dobra_cada_amos_iden,
			:amos_dobra_cada_qtde,
			:amos_dobra_cada_result,
			:amos_dobra_cada_obs,
			:amos_dobra_cada_fina,
			:amos_dobra_cada_fina_data,
			:amos_dobra_cada_fina_usua_iden
		);
	';

/*UPDATE REGISTROS*/
	$UpdtRegDobra = '
		UPDATE amos_dobra_cada SET 
			amos_dobra_cada_amos_iden = :amos_dobra_cada_amos_iden,
			amos_dobra_cada_qtde = :amos_dobra_cada_qtde,
			amos_dobra_cada_result = :amos_dobra_cada_result,
			amos_dobra_cada_obs = :amos_dobra_cada_obs,
			amos_dobra_cada_fina = :amos_dobra_cada_fina,
			amos_dobra_cada_fina_data = :amos_dobra_cada_fina_data,
		  	amos_dobra_cada_fina_usua_iden = :amos_dobra_cada_fina_usua_iden
		WHERE
			amos_dobra_cada_iden = :amos_dobra_cada_iden
	';
?>