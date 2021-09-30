<?php
/*SELECIONA REGISTROS*/
	$GetRegCharp = '
		SELECT
			amos_cada_iden,
			amos_cada_regi,
			amos_cada_orse,
			clie_cada_nome,
			fabr_cada_nome,
			mate_cada_descr,
			mate_cada_impa,
			area_cada_descr,
			amos_cada_emis,
			amos_cada_descr,
			amos_cada_tenan,
			amos_cada_empre,
			IF( amos_cada_charp = 1, "LABORATÓRIO", IF( amos_cada_forne_charp = 1, "CAMPO", "" ) ) AS amos_cada_local,
			IFNULL( amos_charpy_cada_iden, "Automatico" ) AS amos_charpy_cada_iden,
			IFNULL( amos_charpy_cada_qtde, 1 ) AS amos_charpy_cada_qtde,
			IFNULL( amos_charpy_cada_result, -1 ) AS amos_charpy_cada_result,
			amos_charpy_cada_charpy_espe,
			amos_charpy_cada_charpy_obti,
			amos_charpy_cada_obs,
			IFNULL( amos_charpy_cada_fina, 0 ) AS amos_charpy_cada_fina,
			amos_charpy_cada_fina_data,
			amos_charpy_cada_fina_usua_iden,
			usua_cada_nome,
			sis_para_logo,
			sis_para_selo
		FROM
			amos_cada
		LEFT JOIN
			amos_charpy_cada
		ON
			( amos_charpy_cada_amos_iden = amos_cada_iden )
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
			( usua_cada_iden = amos_charpy_cada_fina_usua_iden )
		LEFT JOIN
			sist_para
		ON
			( sist_para_tenant = amos_cada_tenan AND
			  sist_para_empre = amos_cada_empre )
		WHERE
			( amos_cada_charp = 1  OR
			amos_cada_forne_charp = 1 ) AND
			:FILTRO			
	';

/*INSERT REGISTROS*/
	$InstRegCharp = '
		INSERT INTO amos_charpy_cada (
  			amos_charpy_cada_amos_iden,
 			amos_charpy_cada_qtde,
  			amos_charpy_cada_result,
  			amos_charpy_cada_charpy_espe,
  			amos_charpy_cada_charpy_obti,
  			amos_charpy_cada_obs,
  			amos_charpy_cada_fina,
  			amos_charpy_cada_fina_data,
  			amos_charpy_cada_fina_usua_iden
		) VALUES (
  			:amos_charpy_cada_amos_iden,
 			:amos_charpy_cada_qtde,
  			:amos_charpy_cada_result,
  			:amos_charpy_cada_charpy_espe,
  			:amos_charpy_cada_charpy_obti,
  			:amos_charpy_cada_obs,
  			:amos_charpy_cada_fina,
  			:amos_charpy_cada_fina_data,
  			:amos_charpy_cada_fina_usua_iden
		);
	';

/*UPDATE REGISTROS*/
	$UpdtRegCharp = '
		UPDATE amos_charpy_cada SET 
			amos_charpy_cada_amos_iden = :amos_charpy_cada_amos_iden,
			amos_charpy_cada_qtde = :amos_charpy_cada_qtde,
			amos_charpy_cada_result = :amos_charpy_cada_result,
			amos_charpy_cada_charpy_espe = :amos_charpy_cada_charpy_espe,
			amos_charpy_cada_charpy_obti = :amos_charpy_cada_charpy_obti,
			amos_charpy_cada_obs = :amos_charpy_cada_obs,
			amos_charpy_cada_fina = :amos_charpy_cada_fina,
			amos_charpy_cada_fina_data = :amos_charpy_cada_fina_data,
			amos_charpy_cada_fina_usua_iden = :amos_charpy_cada_fina_usua_iden
		WHERE
			amos_charpy_cada_iden = :amos_charpy_cada_iden
	';
?>