<?php
/*SELECIONA REGISTROS*/
	$GetRegAmos = '
		SELECT
			amos_cada_iden,
			amos_cada_regi,
			amos_cada_orse,
			amos_cada_clie_iden,
			clie_cada_nome,
			amos_cada_fabr_iden,
			fabr_cada_nome,
			amos_cada_mate_iden,
			mate_cada_descr,
			amos_cada_area_iden,
			area_cada_descr,
			amos_cada_emis,
			amos_cada_descr,
			amos_cada_usua_iden,
			usua_cada_nome,
			amos_cada_corde,
			amos_cada_priori,
			amos_cada_conta,
			amos_cada_distri,
			amos_cada_obser,
			amos_cada_metalo,
			IF( amos_cada_metalo = 1, ( SELECT
			  	IFNULL( amos_meta_cada_result, -1 ) AS amos_meta_cada_result
			  FROM
				labo_amos_meta_cada
		 	  WHERE
				( amos_meta_cada_amos_iden = amos_cada_iden ) ), 4
			) as amos_cada_metalo_final,
			amos_cada_quimica,
			IF( amos_cada_quimica = 1, ( SELECT
				IFNULL( amos_quimi_cada_result, -1 ) AS amos_quimi_cada_result
			  FROM
			  	labo_amos_quimi_cada
		 	  WHERE
				( amos_quimi_cada_amos_iden = amos_cada_iden ) ), 4
			) as amos_cada_quimica_final,
			amos_cada_tracao_1,
			( SELECT
				IFNULL( amos_tracao_cada_result, -1 ) AS amos_tracao_cada_result
			  FROM
			  	labo_amos_tracao_cada
		 	  WHERE
				( amos_tracao_cada_amos_iden = amos_cada_iden ) AND
				( amos_cada_tracao_1 = 1 )
			) as amos_cada_tracao_1_final,
			amos_cada_tracao_2,
			( SELECT
				IFNULL( amos_tracao_cada_result, -1 ) AS amos_tracao_cada_result
			  FROM
			  	labo_amos_tracao_cada
		 	  WHERE
				( amos_tracao_cada_amos_iden = amos_cada_iden ) AND
				( amos_cada_tracao_2 = 1 )
			) as amos_cada_tracao_2_final,
			amos_cada_dureza,
			IF( amos_cada_dureza = 1, ( SELECT
				IFNULL( amos_dure_cada_result, -1 ) AS amos_dure_cada_result
			  FROM
			  	labo_amos_dure_cada
		 	  WHERE
				( amos_dure_cada_amos_iden = amos_cada_iden ) ), 4
			) as amos_cada_dureza_final,
			amos_cada_charp,
			IF( amos_cada_charp = 1, ( SELECT
				IFNULL( amos_charpy_cada_result, -1 ) AS amos_charpy_cada_result
			  FROM
			  	labo_amos_charpy_cada
		 	  WHERE
				( amos_charpy_cada_amos_iden = amos_cada_iden ) ), 4
			) as amos_cada_charp_final,
			amos_cada_achat_expan,
			( SELECT
				IFNULL( amos_achat_cada_achat_result, -1 ) AS amos_achat_cada_achat_result
			  FROM
			  	labo_amos_achat_cada
		 	  WHERE
				( amos_achat_cada_amos_iden = amos_cada_iden )
			) as amos_cada_achat_final,
			( SELECT
				IFNULL( amos_achat_cada_expan_result, -1 ) AS amos_achat_cada_expan_result
			  FROM
			  	labo_amos_achat_cada
		 	  WHERE
				( amos_achat_cada_amos_iden = amos_cada_iden )
			) as amos_cada_expan_final,
			amos_cada_pce,
			( SELECT
				IFNULL( amos_pcend_cada_result, -1 ) AS amos_pcend_cada_result
			  FROM
			  	labo_amos_pcend_cada
		 	  WHERE
				( amos_pcend_cada_amos_iden = amos_cada_iden )
			) as amos_cada_pce_final,
			amos_cada_dobram_2cps,
			( SELECT
				IFNULL( amos_dobra_cada_result, -1 ) AS amos_dobra_cada_result
			  FROM
			  	labo_amos_dobra_cada
		 	  WHERE
				( amos_dobra_cada_amos_iden = amos_cada_iden ) AND
				( amos_cada_dobram_2cps = 1 )
			) as amos_cada_dobram_2cps_final,
			amos_cada_dobram_4cps,
			( SELECT
				IFNULL( amos_dobra_cada_result, -1 ) AS amos_dobra_cada_result
			  FROM
			  	labo_amos_dobra_cada
		 	  WHERE
				( amos_dobra_cada_amos_iden = amos_cada_iden ) AND
				( amos_cada_dobram_4cps = 1 )
			) as amos_cada_dobram_4cps_final,
			amos_cada_macrog,
			( SELECT
				IFNULL( amos_macro_cada_result, -1 ) AS amos_macro_cada_result
			  FROM
			  	labo_amos_macro_cada
		 	  WHERE
				( amos_macro_cada_amos_iden = amos_cada_iden )
			) as amos_cada_macrog_final,
			amos_cada_campo_metalo,
			IF( amos_cada_campo_metalo = 1, ( SELECT
			  	IFNULL( amos_meta_cada_result, -1 ) AS amos_meta_cada_result
			  FROM
				labo_amos_meta_cada
		 	  WHERE
				( amos_meta_cada_amos_iden = amos_cada_iden ) ), 4
			) as amos_cada_campo_metalo_final,
			amos_cada_campo_quimica,
			IF( amos_cada_campo_quimica = 1, ( SELECT
				IFNULL( amos_quimi_cada_result, -1 ) AS amos_quimi_cada_result
			  FROM
			  	labo_amos_quimi_cada
		 	  WHERE
				( amos_quimi_cada_amos_iden = amos_cada_iden ) ), 4
			) as amos_cada_campo_quimica_final,
			amos_cada_forne_tracao,
			IF( amos_cada_forne_tracao = 1, ( SELECT
				IFNULL( amos_tracao_cada_result, -1 ) AS amos_tracao_cada_result
			  FROM
			  	labo_amos_tracao_cada
		 	  WHERE
				( amos_tracao_cada_amos_iden = amos_cada_iden ) ), 4
			) as amos_cada_forne_tracao_final,
			amos_cada_forne_dureza,
			IF( amos_cada_forne_dureza = 1, ( SELECT
				IFNULL( amos_dure_cada_result, -1 ) AS amos_dure_cada_result
			  FROM
			  	labo_amos_dure_cada
		 	  WHERE
				( amos_dure_cada_amos_iden = amos_cada_iden ) ), 4
			) as amos_cada_forne_dureza_final,
			amos_cada_forne_charp,
			IF( amos_cada_forne_charp = 1, ( SELECT
				IFNULL( amos_charpy_cada_result, -1 ) AS amos_charpy_cada_result
			  FROM
			  	labo_amos_charpy_cada
		 	  WHERE
				( amos_charpy_cada_amos_iden = amos_cada_iden ) ), 4
			) as amos_cada_forne_charp_final,
			amos_cada_tenan,
			amos_cada_empre,
			amos_cada_stat,
			amos_cada_situ,
			sis_para_logo,
			sis_para_selo
		FROM
			labo_amos_cada
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
			sist_usua_cada
		ON
			( usua_cada_iden = amos_cada_usua_iden )
		LEFT JOIN
			sist_para
		ON
			( sist_para_tenant = amos_cada_tenan AND
			  sist_para_empre = amos_cada_empre )
		WHERE
			:FILTRO
	';

/*SITUAÇÃO AMOSTRA*/
	$GetStatAmos = '
		SELECT
			amos_cada_iden,
			amos_cada_stat
		FROM
			labo_amos_cada
		WHERE
			( amos_cada_iden = :amos_cada_iden ) AND
			( amos_cada_stat <> 0 )
	';

/*INSERT REGISTROS*/
	$InstRegAmos = '
		INSERT INTO labo_amos_cada (
			amos_cada_regi,
			amos_cada_orse,
			amos_cada_clie_iden,
			amos_cada_fabr_iden,
			amos_cada_mate_iden,
			amos_cada_area_iden,
			amos_cada_emis,
			amos_cada_descr,
			amos_cada_usua_iden,
			amos_cada_corde,
			amos_cada_priori,
			amos_cada_conta,
			amos_cada_distri,
			amos_cada_obser,
			amos_cada_metalo,
			amos_cada_quimica,
			amos_cada_tracao_1,
			amos_cada_tracao_2,
			amos_cada_dureza,
			amos_cada_charp,
			amos_cada_achat_expan,
			amos_cada_pce,
			amos_cada_dobram_2cps,
			amos_cada_dobram_4cps,
			amos_cada_macrog,
			amos_cada_campo_metalo,
			amos_cada_campo_quimica,
			amos_cada_forne_tracao,
			amos_cada_forne_dureza,
			amos_cada_forne_charp,
			amos_cada_tenan,
			amos_cada_empre,
			amos_cada_stat,
			amos_cada_situ
		) VALUES (
  			:amos_cada_regi,
			:amos_cada_orse,
			:amos_cada_clie_iden,
			:amos_cada_fabr_iden,
			:amos_cada_mate_iden,
			:amos_cada_area_iden,
			:amos_cada_emis,
			:amos_cada_descr,
			:amos_cada_usua_iden,
			:amos_cada_corde,
			:amos_cada_priori,
			:amos_cada_conta,
			:amos_cada_distri,
			:amos_cada_obser,
			:amos_cada_metalo,
			:amos_cada_quimica,
			:amos_cada_tracao_1,
			:amos_cada_tracao_2,
			:amos_cada_dureza,
			:amos_cada_charp,
			:amos_cada_achat_expan,
			:amos_cada_pce,
			:amos_cada_dobram_2cps,
			:amos_cada_dobram_4cps,
			:amos_cada_macrog,
			:amos_cada_campo_metalo,
			:amos_cada_campo_quimica,
			:amos_cada_forne_tracao,
			:amos_cada_forne_dureza,
			:amos_cada_forne_charp,
			:amos_cada_tenan,
			:amos_cada_empre,
			0,
			-1
		);
	';

/*UPDATE REGISTROS*/
	$UpdtRegAmos = '
		UPDATE labo_amos_cada SET 
			amos_cada_regi = :amos_cada_regi,
			amos_cada_orse = :amos_cada_orse,
			amos_cada_clie_iden = :amos_cada_clie_iden,
			amos_cada_fabr_iden = :amos_cada_fabr_iden,
			amos_cada_mate_iden = :amos_cada_mate_iden,
			amos_cada_area_iden = :amos_cada_area_iden,
			amos_cada_emis = :amos_cada_emis,
			amos_cada_descr = :amos_cada_descr,
			amos_cada_usua_iden = :amos_cada_usua_iden,
			amos_cada_corde = :amos_cada_corde,
			amos_cada_priori = :amos_cada_priori,
			amos_cada_conta = :amos_cada_conta,
			amos_cada_distri = :amos_cada_distri,
			amos_cada_obser = :amos_cada_obser,
			amos_cada_metalo = :amos_cada_metalo,
			amos_cada_quimica = :amos_cada_quimica,
			amos_cada_tracao_1 = :amos_cada_tracao_1,
			amos_cada_tracao_2 = :amos_cada_tracao_2,
			amos_cada_dureza = :amos_cada_dureza,
			amos_cada_charp = :amos_cada_charp,
			amos_cada_achat_expan = :amos_cada_achat_expan,
			amos_cada_pce = :amos_cada_pce,
			amos_cada_dobram_2cps = :amos_cada_dobram_2cps,
			amos_cada_dobram_4cps = :amos_cada_dobram_4cps,
			amos_cada_macrog = :amos_cada_macrog,
			amos_cada_campo_metalo = :amos_cada_campo_metalo,
			amos_cada_campo_quimica = :amos_cada_campo_quimica,
			amos_cada_forne_tracao = :amos_cada_forne_tracao,
			amos_cada_forne_dureza = :amos_cada_forne_dureza,
			amos_cada_forne_charp = :amos_cada_forne_charp,
			amos_cada_tenan = :amos_cada_tenan,
			amos_cada_empre = :amos_cada_empre
		WHERE
			amos_cada_iden = :amos_cada_iden AND
			amos_cada_stat = 0
	'; 

/*DELETE REGISTRO*/
	$DeleRegAmos = '
		DELETE FROM
			labo_amos_cada
		WHERE
			amos_cada_iden = :amos_cada_iden AND
			amos_cada_stat = 0
	';
?>