<?php
/*SELECIONA REGISTROS*/
	$GetRegAmosConcl = '
		SELECT
			labo_amos_concl_iden,
			labo_amos_concl_apeli,
			labo_amos_concl_obse,
			labo_amos_concl_tenan,
			labo_amos_concl_empre
		FROM
			labo_amos_concl
		WHERE
			:FILTRO
	';

/*INSERT REGISTROS*/
	$InstRegAmosConcl = '
		INSERT INTO labo_amos_concl (
			labo_amos_concl_apeli,
			labo_amos_concl_obse,
			labo_amos_concl_tenan,
			labo_amos_concl_empre
		) VALUES (
			:labo_amos_concl_apeli,
			:labo_amos_concl_obse,
			:labo_amos_concl_tenan,
			:labo_amos_concl_empre
		);
	';

/*UPDATE REGISTROS*/
	$UpdtRegAmosConcl = '
		UPDATE labo_amos_concl SET 
			labo_amos_concl_apeli = :labo_amos_concl_apeli,
			labo_amos_concl_obse = :labo_amos_concl_obse,
			labo_amos_concl_tenan = :labo_amos_concl_tenan,
			labo_amos_concl_empre = :labo_amos_concl_empre
		WHERE
			labo_amos_concl_iden = :labo_amos_concl_iden
	'; 

/*DELETE REGISTRO*/
	$DeleRegAmosConcl = '
		DELETE FROM
			labo_amos_concl
		WHERE
			labo_amos_concl_iden = :labo_amos_concl_iden
	';

	
/*SELECIONA REGISTROS PARA TERCEIROS*/
	$GetRegAmosConclTerce = '
		SELECT
			labo_amos_concl_iden,
			labo_amos_concl_apeli,
			labo_amos_concl_obse
		FROM
			labo_amos_concl
		WHERE
			labo_amos_concl_tenan LIKE :labo_amos_concl_tenan AND
			labo_amos_concl_empre LIKE :labo_amos_concl_empre
	';
?>