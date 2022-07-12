<?php
/*SELECIONA REGISTROS*/
	$GetRegTrac = '
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
			IF( amos_cada_tracao_1 = 1,"LABORATÓRIO", IF( amos_cada_tracao_2 = 1,"LABORATÓRIO", IF( amos_cada_forne_tracao = 1, "CAMPO", "" ) ) ) AS amos_cada_local,
			IF( amos_cada_tracao_1 = 1,"1º TRAÇÃO", IF( amos_cada_tracao_2 = 1,"2º TRAÇÃO", "" ) ) AS amos_cada_tipo,
			IFNULL( amos_tracao_cada_iden, "Automatico" ) AS amos_tracao_cada_iden,
			IFNULL( amos_tracao_cada_qtde, 1 ) AS amos_tracao_cada_qtde,
			IFNULL( amos_tracao_cada_result, -1 ) AS amos_tracao_cada_result,
			mate_cada_limi_resi,
			mate_cada_limi_esco,
			mate_cada_along,
			mate_cada_redu_area,
			amos_tracao_cada_limi_resist,			
			amos_tracao_cada_limi_escoa,
			amos_tracao_cada_along,
			amos_tracao_cada_redu_area,
			amos_tracao_cada_area,
			amos_tracao_cada_aeo,
			amos_tracao_cada_aef,
			amos_tracao_cada_ra,
			amos_tracao_cada_lo,
			amos_tracao_cada_lf,
			amos_tracao_cada_al,
			amos_tracao_cada_obs,
			IFNULL( amos_tracao_cada_fina, 0 ) AS amos_tracao_cada_fina,
			amos_tracao_cada_fina_data,
			amos_tracao_cada_fina_usua_iden,
			usua_cada_nome,
			amos_cada_concl_livre,
			CONCAT( sist_para_tenant, "_", sist_para_empre, "_", sis_para_logo ) AS sis_para_logo,
			sis_para_selo
		FROM
			labo_amos_cada
		LEFT JOIN
			labo_amos_tracao_cada
		ON
			( amos_tracao_cada_amos_iden = amos_cada_iden )
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
			( usua_cada_iden = amos_tracao_cada_fina_usua_iden )
		LEFT JOIN
			sist_para
		ON
			( sist_para_tenant = amos_cada_tenan AND
			  sist_para_empre = amos_cada_empre )
		WHERE
			( ( amos_cada_tracao_1 = 1 OR
			    amos_cada_tracao_2 = 1 ) OR
			  ( amos_cada_forne_tracao = 1 ) ) AND
			:FILTRO			
	';

/*INSERT REGISTROS*/
	$InstRegTrac = '
		INSERT INTO labo_amos_tracao_cada (
			amos_tracao_cada_amos_iden,
			amos_tracao_cada_qtde,
			amos_tracao_cada_result,
			amos_tracao_cada_limi_resist,			
			amos_tracao_cada_limi_escoa,
			amos_tracao_cada_along,
			amos_tracao_cada_redu_area,
			amos_tracao_cada_area,
			amos_tracao_cada_aeo,
			amos_tracao_cada_aef,
			amos_tracao_cada_ra,
			amos_tracao_cada_lo,
			amos_tracao_cada_lf,
			amos_tracao_cada_al,
			amos_tracao_cada_obs,
			amos_tracao_cada_fina,
			amos_tracao_cada_fina_data,
  			amos_tracao_cada_fina_usua_iden
		) VALUES (
			:amos_tracao_cada_amos_iden,
			:amos_tracao_cada_qtde,
			:amos_tracao_cada_result,
			:amos_tracao_cada_limi_resist,			
			:amos_tracao_cada_limi_escoa,
			:amos_tracao_cada_along,
			:amos_tracao_cada_redu_area,
			:amos_tracao_cada_area,
			:amos_tracao_cada_aeo,
			:amos_tracao_cada_aef,
			:amos_tracao_cada_ra,
			:amos_tracao_cada_lo,
			:amos_tracao_cada_lf,
			:amos_tracao_cada_al,
			:amos_tracao_cada_obs,
			:amos_tracao_cada_fina,
			:amos_tracao_cada_fina_data,
  			:amos_tracao_cada_fina_usua_iden
		);
	';

/*UPDATE REGISTROS*/
	$UpdtRegTrac = '
		UPDATE labo_amos_tracao_cada SET 
			amos_tracao_cada_amos_iden = :amos_tracao_cada_amos_iden,
			amos_tracao_cada_result = :amos_tracao_cada_result,
			amos_tracao_cada_qtde = :amos_tracao_cada_qtde,
			amos_tracao_cada_limi_resist = :amos_tracao_cada_limi_resist,
			amos_tracao_cada_limi_escoa = :amos_tracao_cada_limi_escoa,
			amos_tracao_cada_along = :amos_tracao_cada_along,
			amos_tracao_cada_redu_area = :amos_tracao_cada_redu_area,
			amos_tracao_cada_area = :amos_tracao_cada_area,
			amos_tracao_cada_aeo = :amos_tracao_cada_aeo,
			amos_tracao_cada_aef = :amos_tracao_cada_aef,
			amos_tracao_cada_ra = :amos_tracao_cada_ra,
			amos_tracao_cada_lo = :amos_tracao_cada_lo,
			amos_tracao_cada_lf = :amos_tracao_cada_lf,
			amos_tracao_cada_al = :amos_tracao_cada_al,
			amos_tracao_cada_obs = :amos_tracao_cada_obs,
			amos_tracao_cada_fina = :amos_tracao_cada_fina,
			amos_tracao_cada_fina_data = :amos_tracao_cada_fina_data,
		  	amos_tracao_cada_fina_usua_iden = :amos_tracao_cada_fina_usua_iden
		WHERE
			amos_tracao_cada_iden = :amos_tracao_cada_iden
	';
?>