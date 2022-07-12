<?php	
/*SELECIONA REGISTROS*/
	$GetRegPara = '
		SELECT
			sist_para_iden,
			sist_para_tenant,
			sist_para_empre,
			sis_para_logo,
			sis_para_selo,
			sist_para_smtp,
			sist_para_porta,
			sist_para_secu,
			sist_para_auth,
			sist_para_user,
			sis_para_pwd,
			sis_para_from,
			sis_para_from_name,
			sis_para_cabe
		FROM
			sist_para
		WHERE
			( sist_para_tenant LIKE :sist_para_tenant AND
			  sist_para_empre LIKE :sist_para_empre )
	';

/*INSERT REGISTROS*/
	$InstRegPara = '
		INSERT INTO sist_para (
			sist_para_tenant,
			sist_para_empre,
			sis_para_logo,
			sis_para_selo,
			sist_para_smtp,
			sist_para_porta,
			sist_para_secu,
			sist_para_auth,
			sist_para_user,
			sis_para_pwd,
			sis_para_from,
			sis_para_from_name,
			sis_para_cabe
		) VALUES (
			:sist_para_tenant,
			:sist_para_empre,
			:sis_para_logo,
			:sis_para_selo,
			:sist_para_smtp,
			:sist_para_porta,
			:sist_para_secu,
			:sist_para_auth,
			:sist_para_user,
			:sis_para_pwd,
			:sis_para_from,
			:sis_para_from_name,
			:sis_para_cabe
		);
	';

/*UPDATE REGISTROS*/
	$UpdtRegPara = '
		UPDATE sist_para SET 
			sist_para_tenant = :sist_para_tenant,
			sist_para_empre = :sist_para_empre,
			sis_para_logo = :sis_para_logo,
			sis_para_selo = :sis_para_selo,
			sist_para_smtp = :sist_para_smtp,
			sist_para_porta = :sist_para_porta,
			sist_para_secu = :sist_para_secu,
			sist_para_auth = :sist_para_auth,
			sist_para_user = :sist_para_user,
			sis_para_pwd = :sis_para_pwd,
			sis_para_from = :sis_para_from,
			sis_para_from_name = :sis_para_from_name,
			sis_para_cabe = :sis_para_cabe
		WHERE
			sist_para_iden = :sist_para_iden
	';

/*IMAGENS ANTERIORES SELECIONA REGISTROS*/
	$AnteRegPara = '
		SELECT
			sist_para_iden,
			sis_para_logo,
			sis_para_selo
		FROM
			sist_para
		WHERE
			( sist_para_iden = :sist_para_iden )
	';
?>