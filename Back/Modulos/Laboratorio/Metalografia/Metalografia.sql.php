<?php
/*SELECIONA REGISTROS*/
	$GetRegMeta = '
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
			IF( amos_cada_metalo = 1,"LABORATÓRIO", IF( amos_cada_campo_metalo = 1, "CAMPO", "" ) ) AS amos_cada_local,
			IFNULL( amos_meta_cada_iden, "Automatico" ) AS amos_meta_cada_iden,
			IFNULL( amos_meta_cada_result, -1 ) AS amos_meta_cada_result,
			amos_meta_cada_reag,
			IFNULL( amos_meta_cada_qtde, 1 ) AS amos_meta_cada_qtde,
			amos_meta_cada_matriz,
			amos_meta_cada_graos,
			amos_meta_cada_parti,
			amos_meta_cada_caract,
			amos_meta_cada_obs,
			IFNULL( amos_meta_cada_grafi, 0 ) AS amos_meta_cada_grafi,
			IFNULL( amos_meta_cada_fina, 0 ) AS amos_meta_cada_fina,
			amos_meta_cada_fina_data,
			amos_meta_cada_fina_usua_iden,
			usua_cada_nome,
			amos_cada_tenan,
			amos_cada_empre,
			sis_para_logo,
			sis_para_selo
		FROM
			labo_amos_cada
		LEFT JOIN
			labo_amos_meta_cada
		ON
			( amos_meta_cada_amos_iden = amos_cada_iden )
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
			( usua_cada_iden = amos_meta_cada_fina_usua_iden )
		LEFT JOIN
			sist_para
		ON
			( sist_para_tenant = amos_cada_tenan AND
			  sist_para_empre = amos_cada_empre )
		WHERE
			( amos_cada_metalo = 1 OR
			  amos_cada_campo_metalo = 1 ) AND
			:FILTRO			
	';

/*INSERT REGISTROS*/
	$InstRegMeta = '
		INSERT INTO labo_amos_meta_cada (
  			amos_meta_cada_amos_iden,
  			amos_meta_cada_result,
  			amos_meta_cada_reag,
  			amos_meta_cada_qtde,
  			amos_meta_cada_matriz,
  			amos_meta_cada_graos,
  			amos_meta_cada_parti,
  			amos_meta_cada_caract,
  			amos_meta_cada_obs,
  			amos_meta_cada_grafi,
  			amos_meta_cada_fina,
  			amos_meta_cada_fina_data,
  			amos_meta_cada_fina_usua_iden
		) VALUES (
			:amos_meta_cada_amos_iden,
			:amos_meta_cada_result,
			:amos_meta_cada_reag,
			:amos_meta_cada_qtde,
			:amos_meta_cada_matriz,
			:amos_meta_cada_graos,
			:amos_meta_cada_parti,
			:amos_meta_cada_caract,
			:amos_meta_cada_obs,
			:amos_meta_cada_grafi,
			:amos_meta_cada_fina,
			:amos_meta_cada_fina_data,
			:amos_meta_cada_fina_usua_iden
		);
	';

/*UPDATE REGISTROS*/
	$UpdtRegMeta = '
		UPDATE labo_amos_meta_cada SET 
			amos_meta_cada_amos_iden =:amos_meta_cada_amos_iden,
			amos_meta_cada_result =:amos_meta_cada_result,
			amos_meta_cada_reag =:amos_meta_cada_reag,
			amos_meta_cada_qtde =:amos_meta_cada_qtde,
			amos_meta_cada_matriz =:amos_meta_cada_matriz,
			amos_meta_cada_graos =:amos_meta_cada_graos,
			amos_meta_cada_parti =:amos_meta_cada_parti,
			amos_meta_cada_caract =:amos_meta_cada_caract,
			amos_meta_cada_obs =:amos_meta_cada_obs,
			amos_meta_cada_grafi =:amos_meta_cada_grafi,
			amos_meta_cada_fina =:amos_meta_cada_fina,
			amos_meta_cada_fina_data =:amos_meta_cada_fina_data,
			amos_meta_cada_fina_usua_iden =:amos_meta_cada_fina_usua_iden
		WHERE
			amos_meta_cada_iden = :amos_meta_cada_iden
	';
?>