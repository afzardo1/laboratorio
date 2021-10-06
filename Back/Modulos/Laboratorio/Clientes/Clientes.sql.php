<?php	
/*SELECIONA REGISTROS*/
	$GetRegClie = '
		SELECT
			clie_cada_iden,
			clie_cada_refe,
			clie_cada_docu,
			clie_cada_nome,
			clie_cada_tenan,
			clie_cada_empre,
			clie_cada_stat			
		FROM
			labo_clie_cada
		WHERE
			( clie_cada_refe LIKE :clie_cada_refe OR
			  clie_cada_docu LIKE :clie_cada_docu OR
			  clie_cada_nome LIKE :clie_cada_nome ) AND
			clie_cada_tenan LIKE :clie_cada_tenan AND
			clie_cada_empre LIKE :clie_cada_empre
	';

/*SELECIONA DUPLICADOS*/
	$DuplRegClie = '
		SELECT
			COUNT( clie_cada_iden ) AS clie_cada_iden
		FROM
			labo_clie_cada
		WHERE
			clie_cada_iden <> :clie_cada_iden AND
			clie_cada_docu = :clie_cada_docu
	'; 

/*INSERT REGISTROS*/
	$InstRegClie = '
		INSERT INTO labo_clie_cada (
			clie_cada_refe,
			clie_cada_docu,
			clie_cada_nome,
			clie_cada_tenan,
			clie_cada_empre,
			clie_cada_stat
		) VALUES (
			:clie_cada_refe,
			:clie_cada_docu,
			:clie_cada_nome,
			:clie_cada_tenan,
			:clie_cada_empre,
			:clie_cada_stat
		);
	';

/*UPDATE REGISTROS*/
	$UpdtRegClie = '
		UPDATE labo_clie_cada SET 
			clie_cada_refe = :clie_cada_refe,
			clie_cada_docu = :clie_cada_docu,
			clie_cada_nome = :clie_cada_nome,
			clie_cada_tenan = :clie_cada_tenan,
			clie_cada_empre = :clie_cada_empre,
			clie_cada_stat = :clie_cada_stat
		WHERE
			clie_cada_iden = :clie_cada_iden
	'; 

/*DELETE REGISTRO*/
	$DeleRegClie = '
		DELETE FROM
			labo_clie_cada
		WHERE
			clie_cada_iden = :clie_cada_iden
	';

/*SELECIONA REGISTROS PARA TERCEIROS*/
	$GetRegClieTerce = '
		SELECT
			clie_cada_iden,
			clie_cada_nome
		FROM
			labo_clie_cada
		WHERE
			clie_cada_stat LIKE :clie_cada_stat AND
			clie_cada_tenan LIKE :clie_cada_tenan AND
			clie_cada_empre LIKE :clie_cada_empre
	';
?>