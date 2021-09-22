<?php
/*SELECIONA REGISTRO*/
	$GetRegMenu = '
		SELECT
			usua_aces_cada_iden,
			usua_aces_cada_usua_iden,
			usua_aces_cada_opca_iden,
			usua_aces_cada_opca_stat
		FROM
			usua_aces_cada
		WHERE
			usua_aces_cada_usua_iden = :usua_aces_cada_usua_iden
		ORDER BY
			usua_aces_cada_usua_iden,
			usua_aces_cada_opca_iden DESC
	';
?>