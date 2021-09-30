<?php	
/*SELECIONA REGISTROS*/
	$GetRegMate = '
		SELECT
			mate_cada_iden,
  			mate_cada_descr,
  			mate_cada_forne,
  			mate_cada_limi_resi,
  			mate_cada_limi_esco,
  			mate_cada_along,
  			mate_cada_redu_area,
  			mate_cada_dure,
  			mate_cada_impa,
  			mate_cada_prof_cama_endu,
  			mate_cada_C,
  			mate_cada_Si,
  			mate_cada_Mn,
  			mate_cada_P,
  			mate_cada_S,
  			mate_cada_Cr,
  			mate_cada_Ni,
  			mate_cada_Mo,
  			mate_cada_Cu,
  			mate_cada_Al,
  			mate_cada_Fe,
  			mate_cada_V,
  			mate_cada_Co,
  			mate_cada_Nb,
  			mate_cada_Ti,
  			mate_cada_W,
  			mate_cada_Mg,
  			mate_cada_Zn,
  			mate_cada_Pb,
  			mate_cada_Sb,
  			mate_cada_Sn,
  			mate_cada_Ca,
  			mate_cada_Cl,
  			mate_cada_N,
  			mate_cada_Na,
  			mate_cada_Ceq,
			mate_cada_tenant_iden,
			mate_cada_empre_iden
		FROM
			mate_cada
		WHERE
			( mate_cada_descr LIKE :mate_cada_descr OR
			  mate_cada_forne LIKE :mate_cada_forne ) AND
			mate_cada_tenant_iden LIKE :mate_cada_tenant_iden AND
			mate_cada_empre_iden LIKE :mate_cada_empre_iden
	';

/*INSERT REGISTROS*/
	$InstRegMate = '
		INSERT INTO mate_cada (
  			mate_cada_descr,
  			mate_cada_forne,
  			mate_cada_limi_resi,
  			mate_cada_limi_esco,
  			mate_cada_along,
  			mate_cada_redu_area,
  			mate_cada_dure,
  			mate_cada_impa,
  			mate_cada_prof_cama_endu,
  			mate_cada_C,
  			mate_cada_Si,
  			mate_cada_Mn,
  			mate_cada_P,
  			mate_cada_S,
  			mate_cada_Cr,
  			mate_cada_Ni,
  			mate_cada_Mo,
  			mate_cada_Cu,
  			mate_cada_Al,
  			mate_cada_Fe,
  			mate_cada_V,
  			mate_cada_Co,
  			mate_cada_Nb,
  			mate_cada_Ti,
  			mate_cada_W,
  			mate_cada_Mg,
  			mate_cada_Zn,
  			mate_cada_Pb,
  			mate_cada_Sb,
  			mate_cada_Sn,
  			mate_cada_Ca,
  			mate_cada_Cl,
  			mate_cada_N,
  			mate_cada_Na,
  			mate_cada_Ceq,
			mate_cada_tenant_iden,
			mate_cada_empre_iden
		) VALUES (
  			:mate_cada_descr,
  			:mate_cada_forne,
  			:mate_cada_limi_resi,
  			:mate_cada_limi_esco,
  			:mate_cada_along,
  			:mate_cada_redu_area,
  			:mate_cada_dure,
  			:mate_cada_impa,
  			:mate_cada_prof_cama_endu,
  			:mate_cada_C,
  			:mate_cada_Si,
  			:mate_cada_Mn,
  			:mate_cada_P,
  			:mate_cada_S,
  			:mate_cada_Cr,
  			:mate_cada_Ni,
  			:mate_cada_Mo,
  			:mate_cada_Cu,
  			:mate_cada_Al,
  			:mate_cada_Fe,
  			:mate_cada_V,
  			:mate_cada_Co,
  			:mate_cada_Nb,
  			:mate_cada_Ti,
  			:mate_cada_W,
  			:mate_cada_Mg,
  			:mate_cada_Zn,
  			:mate_cada_Pb,
  			:mate_cada_Sb,
  			:mate_cada_Sn,
  			:mate_cada_Ca,
  			:mate_cada_Cl,
  			:mate_cada_N,
  			:mate_cada_Na,
  			:mate_cada_Ceq,
			:mate_cada_tenant_iden,
			:mate_cada_empre_iden
		);
	';

/*UPDATE REGISTROS*/
	$UpdtRegMate = '
		UPDATE mate_cada SET 
			mate_cada_descr = :mate_cada_descr,
			mate_cada_forne = :mate_cada_forne,
			mate_cada_limi_resi = :mate_cada_limi_resi,
			mate_cada_limi_esco = :mate_cada_limi_esco,
			mate_cada_along = :mate_cada_along,
			mate_cada_redu_area = :mate_cada_redu_area,
			mate_cada_dure = :mate_cada_dure,
			mate_cada_impa = :mate_cada_impa,
			mate_cada_prof_cama_endu = :mate_cada_prof_cama_endu,
			mate_cada_C = :mate_cada_C,
			mate_cada_Si = :mate_cada_Si,
			mate_cada_Mn = :mate_cada_Mn,
			mate_cada_P = :mate_cada_P,
			mate_cada_S = :mate_cada_S,
			mate_cada_Cr = :mate_cada_Cr,
			mate_cada_Ni = :mate_cada_Ni,
			mate_cada_Mo = :mate_cada_Mo,
			mate_cada_Cu = :mate_cada_Cu,
			mate_cada_Al = :mate_cada_Al,
			mate_cada_Fe = :mate_cada_Fe,
			mate_cada_V = :mate_cada_V,
			mate_cada_Co = :mate_cada_Co,
			mate_cada_Nb = :mate_cada_Nb,
			mate_cada_Ti = :mate_cada_Ti,
			mate_cada_W = :mate_cada_W,
			mate_cada_Mg = :mate_cada_Mg,
			mate_cada_Zn = :mate_cada_Zn,
			mate_cada_Pb = :mate_cada_Pb,
			mate_cada_Sb = :mate_cada_Sb,
			mate_cada_Sn = :mate_cada_Sn,
			mate_cada_Ca = :mate_cada_Ca,
			mate_cada_Cl = :mate_cada_Cl,
			mate_cada_N = :mate_cada_N,
			mate_cada_Na = :mate_cada_Na,
			mate_cada_Ceq = :mate_cada_Ceq,
	  		mate_cada_tenant_iden = :mate_cada_tenant_iden,
	  		mate_cada_empre_iden = :mate_cada_empre_iden
		WHERE
			mate_cada_iden = :mate_cada_iden
	'; 

/*DELETE REGISTRO*/
	$DeleRegMate = '
		DELETE FROM
			mate_cada
		WHERE
			mate_cada_iden = :mate_cada_iden
	';

/*SELECIONA REGISTROS PARA TERCEIROS*/
	$GetRegMateTerce = '
		SELECT
			mate_cada_iden,
			mate_cada_descr
		FROM
			mate_cada
		WHERE
			mate_cada_tenant_iden LIKE :mate_cada_tenant_iden AND
			mate_cada_empre_iden LIKE :mate_cada_empre_iden
	';
?>