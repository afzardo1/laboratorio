<?php
/*SELECIONA REGISTROS*/
	$GetRegPcend = '
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
			IF( amos_cada_pce = 1,"LABORATÓRIO", "CAMPO" ) AS amos_cada_local,
			IFNULL( amos_pcend_cada_iden, "Automatico" ) AS amos_pcend_cada_iden,
			IFNULL( amos_pcend_cada_qtde, 1 ) AS amos_pcend_cada_qtde,
			IFNULL( amos_pcend_cada_result, -1 ) AS amos_pcend_cada_result,
			IFNULL( amos_pcend_cada_obs, "" ) AS amos_pcend_cada_obs,
			IFNULL( amos_pcend_cada_fina, 0 ) AS amos_pcend_cada_fina,
			IFNULL( amos_pcend_cada_fina_data, "" ) AS amos_pcend_cada_fina_data,
			IFNULL( amos_pcend_cada_fina_usua_iden, "" ) AS amos_pcend_cada_fina_usua_iden,
			IFNULL( usua_cada_nome, "" ) AS usua_cada_nome,
			CONCAT( sist_para_tenant, "_", sist_para_empre, "_", sis_para_logo ) AS sis_para_logo,
			sis_para_selo
		FROM
			labo_amos_cada
		LEFT JOIN
			labo_amos_pcend_cada
		ON
			( amos_pcend_cada_amos_iden = amos_cada_iden )
		LEFT JOIN
			labo_clie_cada
		ON
			( clie_cada_iden = amos_cada_clie_iden )
		LEFT JOIN
			labo_fabr_cada
		ON
			( fabr_cada_iden = amos_cada_fabr_iden )
		LEFT JOIN
			labo_mate_cada
		ON
			( mate_cada_iden = amos_cada_mate_iden )
		LEFT JOIN
			labo_area_cada
		ON
			( area_cada_iden = amos_cada_area_iden )
		LEFT JOIN
			sist_tenant_cada
		ON
			( tenant_cada_iden = amos_cada_tenan )
		LEFT JOIN
			sist_usua_cada
		ON
			( usua_cada_iden = amos_pcend_cada_fina_usua_iden )
		LEFT JOIN
			sist_para
		ON
			( sist_para_tenant = amos_cada_tenan AND
			  sist_para_empre = amos_cada_empre )
		WHERE
			( amos_cada_pce = 1 ) AND
			:FILTRO			
	';

/*INSERT REGISTROS*/
	$InstRegPcend = '
		INSERT INTO labo_amos_pcend_cada (
			amos_pcend_cada_amos_iden,
			amos_pcend_cada_qtde,
			amos_pcend_cada_result,
			amos_pcend_cada_obs,
			amos_pcend_cada_fina,
			amos_pcend_cada_fina_data,
  			amos_pcend_cada_fina_usua_iden
		) VALUES (
			:amos_pcend_cada_amos_iden,
			:amos_pcend_cada_qtde,
			:amos_pcend_cada_result,
			:amos_pcend_cada_obs,
			:amos_pcend_cada_fina,
			:amos_pcend_cada_fina_data,
			:amos_pcend_cada_fina_usua_iden
		);
	';

/*UPDATE REGISTROS*/
	$UpdtRegPcend = '
		UPDATE labo_amos_pcend_cada SET 
			amos_pcend_cada_amos_iden = :amos_pcend_cada_amos_iden,
			amos_pcend_cada_qtde = :amos_pcend_cada_qtde,
			amos_pcend_cada_result = :amos_pcend_cada_result,
			amos_pcend_cada_obs = :amos_pcend_cada_obs,
			amos_pcend_cada_fina = :amos_pcend_cada_fina,
			amos_pcend_cada_fina_data = :amos_pcend_cada_fina_data,
		  	amos_pcend_cada_fina_usua_iden = :amos_pcend_cada_fina_usua_iden
		WHERE
			amos_pcend_cada_iden = :amos_pcend_cada_iden
	';
?>