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