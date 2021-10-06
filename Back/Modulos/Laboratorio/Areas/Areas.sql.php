<?php	
/*SELECIONA REGISTROS*/
	$GetRegArea = '
		SELECT
			area_cada_iden,
  			area_cada_refe,
  			area_cada_descr,
  			area_cada_stat,
  			area_cada_tenan,
  			area_cada_empre
		FROM
			labo_area_cada
		WHERE
			( area_cada_refe LIKE :area_cada_refe OR
			  area_cada_descr LIKE :area_cada_descr ) AND
			area_cada_tenan LIKE :area_cada_tenan AND
			area_cada_empre LIKE :area_cada_empre
	';

/*INSERT REGISTROS*/
	$InstRegArea = '
		INSERT INTO labo_area_cada (
  			area_cada_refe,
  			area_cada_descr,
  			area_cada_stat,
  			area_cada_tenan,
  			area_cada_empre
		) VALUES (
  			:area_cada_refe,
  			:area_cada_descr,
  			:area_cada_stat,
  			:area_cada_tenan,
  			:area_cada_empre
		);
	';

/*UPDATE REGISTROS*/
	$UpdtRegArea = '
		UPDATE labo_area_cada SET 
			area_cada_refe = :area_cada_refe,
			area_cada_descr = :area_cada_descr,
			area_cada_stat = :area_cada_stat,
			area_cada_tenan = :area_cada_tenan,
			area_cada_empre = :area_cada_empre
		WHERE
			area_cada_iden = :area_cada_iden
	'; 

/*DELETE REGISTRO*/
	$DeleRegArea = '
		DELETE FROM
			labo_area_cada
		WHERE
			area_cada_iden = :area_cada_iden
	';

/*SELECIONA REGISTROS PARA TERCEIROS*/
	$GetRegAreaTerce = '
		SELECT
			area_cada_iden,
			area_cada_descr
		FROM
			labo_area_cada
		WHERE
			area_cada_stat LIKE :area_cada_stat AND
			area_cada_tenan LIKE :area_cada_tenan AND
			area_cada_empre LIKE :area_cada_empre
	';
?>