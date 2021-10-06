<?php	
/*SELECIONA REGISTROS*/
	$GetRegFabr = '
		SELECT
			fabr_cada_iden,
			fabr_cada_refe,
			fabr_cada_docu,
			fabr_cada_nome,
			fabr_cada_tenan,
			fabr_cada_empre,
			fabr_cada_stat
		FROM
			labo_fabr_cada
		WHERE
			( fabr_cada_refe LIKE :fabr_cada_refe OR
			  fabr_cada_docu LIKE :fabr_cada_docu OR
			  fabr_cada_nome LIKE :fabr_cada_nome ) AND
			fabr_cada_tenan LIKE :fabr_cada_tenan AND
			fabr_cada_empre LIKE :fabr_cada_empre
	';

/*SELECIONA DUPLICADOS*/
	$DuplRegFabr = '
		SELECT
			COUNT( fabr_cada_iden ) AS fabr_cada_iden
		FROM
			labo_fabr_cada
		WHERE
			fabr_cada_iden <> :fabr_cada_iden AND
			fabr_cada_docu = :fabr_cada_docu
	'; 

/*INSERT REGISTROS*/
	$InstRegFabr = '
		INSERT INTO labo_fabr_cada (
			fabr_cada_refe,
			fabr_cada_docu,
			fabr_cada_nome,
			fabr_cada_tenan,
			fabr_cada_empre,
			fabr_cada_stat
		) VALUES (
			:fabr_cada_refe,
			:fabr_cada_docu,
			:fabr_cada_nome,
			:fabr_cada_tenan,
			:fabr_cada_empre,
			:fabr_cada_stat
		);
	';

/*UPDATE REGISTROS*/
	$UpdtRegFabr = '
		UPDATE labo_fabr_cada SET 
			fabr_cada_refe = :fabr_cada_refe,
			fabr_cada_docu = :fabr_cada_docu,
			fabr_cada_nome = :fabr_cada_nome,
			fabr_cada_tenan = :fabr_cada_tenan,
			fabr_cada_empre = :fabr_cada_empre,
			fabr_cada_stat = :fabr_cada_stat
		WHERE
			fabr_cada_iden = :fabr_cada_iden
	'; 

/*DELETE REGISTRO*/
	$DeleRegFabr = '
		DELETE FROM
			labo_fabr_cada
		WHERE
			fabr_cada_iden = :fabr_cada_iden
	';

/*SELECIONA REGISTROS PARA TERCEIROS*/
	$GetRegFabrTerce = '
		SELECT
			fabr_cada_iden,
			fabr_cada_nome
		FROM
			labo_fabr_cada
		WHERE
			fabr_cada_stat LIKE :fabr_cada_stat	AND
			fabr_cada_tenan LIKE :fabr_cada_tenan AND
			fabr_cada_empre LIKE :fabr_cada_empre
	';
?>