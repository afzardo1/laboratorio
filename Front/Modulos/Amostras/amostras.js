/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuAmos = '';
    var vThisPerg = '';
    var vTipoOpera = '';
/*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnAmos' );
    $(document).on( 'click', '#FiltBtnAmos', function(event){
        Core.LoadMenu.show()
        Core.Amostras.GetTableAmos( '#TableAmos', { 
            evento:{
                amos_cada_tenan: $( '#FiltTenanAmos' ).val(),
                amos_cada_empre: $( '#FiltEmpreAmos' ).val(),
                amos_cada_regi: '%' + $( '#FiltRgAmos' ).val() + '%',
                amos_cada_orse: '%' + $( '#FiltOsAmos' ).val() + '%',
                amos_cada_emis_ini: $( '#FiltEmisIniAmos' ).val (),
                amos_cada_emis_fim: $( '#FiltEmisFimAmos' ).val (),
            }
        }, function( vRespLogi ){
            if ( vRespLogi.status != 'sucesso' ){
                $( '#AlertMenuCont' ).html(
                    '<div id="AlertMenu" class="alert alert-warning alert-dismissible fade" role="alert">' +
                        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                    '</div>'
                );
                $( '#AlertMenu' ).removeClass('alert alert-warning');
                $( '#AlertMenu' ).removeClass('alert alert-danger');
                if ( vRespLogi.status == 'invalido'){
                    $( '#AlertMenu' ).addClass('alert alert-warning');
                } else if ( vRespLogi.status == 'erro'){
                    $( '#AlertMenu' ).addClass('alert alert-danger');
                };
                $( '#AlertMenu' ).prepend( vRespLogi.detalhes );
                $( '#AlertMenu' ).addClass('show');
                $( '#AlertMenu' ).show();
            }
            Core.LoadMenu.hide();
            $( '#FiltRgAmos' ).focus();
        });
    });
/*--INICIALIZAÇÃO*/
    Core.LoadMenu.show();
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Laboratorio/Amostras/GetTenanAmos/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanAmos' ), Resposta.registros, function(){
            $( '#FiltTenanAmos' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanAmos' ).prop( 'disabled', true );
            };
            Core.SetAjax( { evento: 
              { empre_cada_stat: '%%',
                empre_cada_tenant: $( '#FiltTenanAmos' ).val() 
              } }, '../../Laboratorio/Amostras/GetEmpreAmos/', function( Resposta ){
                Core.SetSele2( $( '#FiltEmpreAmos' ), Resposta.registros, function(){
                    $( '#FiltEmpreAmos' ).val( Core.Login.GetUsuaSess( 'usua_cada_empre' ) ).trigger( 'change' );
                    if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
                        $( '#FiltEmpreAmos' ).prop( 'disabled', true );
                    };
                    Core.SetMask( '#FiltEmisIniAmos, #FiltEmisFimAmos', 'DATA' );
                    $( '#FiltEmisIniAmos' ).val ( Core.Data().subtract ( 30, 'days' ).format('L') );
                    $( '#FiltEmisFimAmos' ).val ( Core.Data().endOf('month').format('L') );
                    $( '#FiltBtnAmos' ).click();
                });
            });
        });
    });
/*--FILTRO TENANT*/
    $(document).off( 'change', '#FiltTenanAmos' );
    $(document).on( 'change', '#FiltTenanAmos', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
           { empre_cada_stat: '%%',
             empre_cada_tenant: $( this ).val() 
           } }, '../../Laboratorio/Amostras/GetEmpreAmos/', function( Resposta ){
            Core.SetSele2( $( '#FiltEmpreAmos' ), Resposta.registros, function(){
                Core.LoadMenu.hide();
            });
        });    
    });
/*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltRgAmos, #FiltOsAmos, #FiltEmisIniAmos, #FiltEmisFimAmos' );
    $(document).on( 'keypress', '#FiltRgAmos, #FiltOsAmos, #FiltEmisIniAmos, #FiltEmisFimAmos', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnAmos' ).click();
        }
    });
/*--ADICIONA*/
    $(document).off( 'click', '#AddBtnAmos' );
    $(document).on( 'click', '#AddBtnAmos', function(event){
        Core.LoadMenu.show()
        Core.Amostras.GetAddAmos( this, function( ResObjPai ){
            vTipoOpera = '1';
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#RGAmos' ).focus();
        });
    });
/*--EDITA*/
    $(document).off( 'click', '#EditBtnAmos' );
    $(document).on( 'click', '#EditBtnAmos', function(event){
        Core.LoadMenu.show()
        Core.Amostras.GetEdtAmos( this, function( ResObjPai ){
            vTipoOpera = '%%';
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#RGAmos' ).focus();          
        });
    });
/*--TENANT*/
    $(document).off( 'change', '#TenanAmos' );
    $(document).on( 'change', '#TenanAmos', function(event){
        if ( vTipoOpera != '' ){
            var VThis = this;
            Core.LoadMenu.show();
            Core.GetObjtPai( VThis, [ 'FormAmos' ], function( ResObjPai ){
                Core.SetAjax( { evento: 
                  { empre_cada_stat: vTipoOpera,
                    empre_cada_tenant: $( VThis ).val(),
                  } }, '../../Laboratorio/Amostras/GetEmpreAmos/', function( Resposta ){
                    Core.SetSele2( $( ResObjPai ).find( '#EmpreAmos' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: {
                            clie_cada_stat: vTipoOpera,
                            clie_cada_tenan: $( VThis ).val(),
                            clie_cada_empre: $( ResObjPai ).find( '#EmpreAmos' ).val(),
                        } }, '../../Laboratorio/Amostras/GetClieAmos/', function( Resposta ){
                            Core.SetSele2( $( ResObjPai ).find( '#ClieAmos' ), Resposta.registros, function(){
                                Core.SetAjax( { evento: {
                                    fabr_cada_stat: vTipoOpera,
                                    fabr_cada_tenan: $( VThis ).val(),
                                    fabr_cada_empre: $( ResObjPai ).find( '#EmpreAmos' ).val(),
                                } }, '../../Laboratorio/Amostras/GetFabrAmos/', function( Resposta ){
                                    Core.SetSele2( $( ResObjPai ).find( '#FabrAmos' ), Resposta.registros, function(){
                                        Core.SetAjax( { evento: {
                                            mate_cada_tenant_iden: $( VThis ).val(),
                                            mate_cada_empre_iden: $( ResObjPai ).find( '#EmpreAmos' ).val(),
                                          } }, '../../Laboratorio/Amostras/GetMateAmos/', function( Resposta ){
                                            Core.SetSele2( $( ResObjPai ).find( '#MateAmos' ), Resposta.registros, function(){
                                                Core.SetAjax( { evento: {
                                                    area_cada_stat: vTipoOpera,
                                                    area_cada_tenan: $( VThis ).val(),
                                                    area_cada_empre: $( ResObjPai ).find( '#EmpreAmos' ).val(),
                                                  } }, '../../Laboratorio/Amostras/GetAreaAmos/', function( Resposta ){
                                                    Core.SetSele2( $( ResObjPai ).find( '#AreaAmos' ), Resposta.registros, function(){
                                                        Core.LoadMenu.hide();
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        };
    });
/*--EMPRESA*/
    $(document).off( 'change', '#EmpreAmos' );
    $(document).on( 'change', '#EmpreAmos', function(event){
        if ( vTipoOpera != '' ){
            var VThis = this;
            Core.LoadMenu.show();
            Core.GetObjtPai( VThis, [ 'FormAmos' ], function( ResObjPai ){
                Core.SetAjax( { evento: {
                    clie_cada_stat: vTipoOpera,
                    clie_cada_tenan: $( ResObjPai ).find( '#TenanAmos' ).val(),
                    clie_cada_empre: $( VThis ).val()
                   } }, '../../Laboratorio/Amostras/GetClieAmos/', function( Resposta ){
                    Core.SetSele2( $( ResObjPai ).find( '#ClieAmos' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: {
                            fabr_cada_stat: vTipoOpera,
                            fabr_cada_tenan: $( ResObjPai ).find( '#TenanAmos' ).val(),
                            fabr_cada_empre: $( VThis ).val()
                          } }, '../../Laboratorio/Amostras/GetFabrAmos/', function( Resposta ){
                            Core.SetSele2( $( ResObjPai ).find( '#FabrAmos' ), Resposta.registros, function(){
                                Core.SetAjax( { evento: {
                                    mate_cada_tenant_iden: $( ResObjPai ).find( '#TenanAmos' ).val(),
                                    mate_cada_empre_iden: $( VThis ).val()
                                  } }, '../../Laboratorio/Amostras/GetMateAmos/', function( Resposta ){
                                    Core.SetSele2( $( ResObjPai ).find( '#MateAmos' ), Resposta.registros, function(){
                                        Core.SetAjax( { evento: {
                                            area_cada_stat: vTipoOpera,
                                            area_cada_tenan: $( ResObjPai ).find( '#TenanAmos' ).val(),
                                            area_cada_empre: $( VThis ).val()
                                          } }, '../../Laboratorio/Amostras/GetAreaAmos/', function( Resposta ){
                                            Core.SetSele2( $( ResObjPai ).find( '#AreaAmos' ), Resposta.registros, function(){
                                                Core.LoadMenu.hide();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        };
    });
/*--CHECA ENSAIO LABORATÓRIO*/
    $(document).off( 'click', '#MetaEnsaAmos, #QuimiEnsaAmos, #Trac1EnsaAmos, #Trac2EnsaAmos, #DureEnsaAmos, #CharpEnsaAmos' );
    $(document).on( 'click', '#MetaEnsaAmos, #QuimiEnsaAmos, #Trac1EnsaAmos, #Trac2EnsaAmos, #DureEnsaAmos, #CharpEnsaAmos', function(event){
        var vThis = this;
        Core.GetObjtPai( vThis, [ 'AddListAmos', 'EdtListAmos' ], function( ResObjPai ){
            if ( $ ( vThis ).attr( 'id' ) ==  'MetaEnsaAmos' ) {
                if ( $( vThis ).is( ':checked' ) == true ) {
                    $( ResObjPai ).find( '#MetaCampoEnsaAmos' ).prop('checked', false );
                };
            } else if ( $ ( vThis ).attr( 'id' ) ==  'QuimiEnsaAmos' ) {
                if ( $( vThis ).is( ':checked' ) == true ) {
                    $( ResObjPai ).find( '#QuimiCampoEnsaAmos' ).prop('checked', false );
                };
            } else if ( $ ( vThis ).attr( 'id' ) ==  'Trac1EnsaAmos' || $ ( vThis ).attr( 'id' ) ==  'Trac2EnsaAmos') {
                if ( $( vThis ).is( ':checked' ) == true ) {
                    $( ResObjPai ).find( '#TracaForneEnsaAmos' ).prop('checked', false );
                };
            } else if ( $ ( vThis ).attr( 'id' ) ==  'DureEnsaAmos' ) {
                if ( $( vThis ).is( ':checked' ) == true ) {
                    $( ResObjPai ).find( '#DureForneEnsaAmos' ).prop('checked', false );
                };
            } else if ( $ ( vThis ).attr( 'id' ) ==  'CharpEnsaAmos' ) {
                if ( $( vThis ).is( ':checked' ) == true ) {
                    $( ResObjPai ).find( '#CharpForneEnsaAmos' ).prop('checked', false );
                };
            };
        });
    });
/*--CHECA ENSAIO EM CAMPO*/
    $(document).off( 'click', '#MetaCampoEnsaAmos, #QuimiCampoEnsaAmos, #TracaForneEnsaAmos, #DureForneEnsaAmos, #CharpForneEnsaAmos' );
    $(document).on( 'click', '#MetaCampoEnsaAmos, #QuimiCampoEnsaAmos, #TracaForneEnsaAmos, #DureForneEnsaAmos, #CharpForneEnsaAmos', function(event){
        var vThis = this;
        Core.GetObjtPai( vThis, [ 'AddListAmos', 'EdtListAmos' ], function( ResObjPai ){
            if ( $ ( vThis ).attr( 'id' ) ==  'MetaCampoEnsaAmos' ) {
                if ( $( vThis ).is( ':checked' ) == true ) {
                    $( ResObjPai ).find( '#MetaEnsaAmos' ).prop('checked', false );
                };
            } else if ( $ ( vThis ).attr( 'id' ) ==  'QuimiCampoEnsaAmos' ) {
                if ( $( vThis ).is( ':checked' ) == true ) {
                    $( ResObjPai ).find( '#QuimiEnsaAmos' ).prop('checked', false );
                };
            } else if ( $ ( vThis ).attr( 'id' ) ==  'TracaForneEnsaAmos' ) {
                if ( $( vThis ).is( ':checked' ) == true ) {
                    $( ResObjPai ).find( '#Trac1EnsaAmos' ).prop('checked', false );
                    $( ResObjPai ).find( '#Trac2EnsaAmos' ).prop('checked', false );
                };
            } else if ( $ ( vThis ).attr( 'id' ) ==  'DureForneEnsaAmos' ) {
                if ( $( vThis ).is( ':checked' ) == true ) {
                    $( ResObjPai ).find( '#DureEnsaAmos' ).prop('checked', false );
                };
            } else if ( $ ( vThis ).attr( 'id' ) ==  'CharpForneEnsaAmos' ) {
                if ( $( vThis ).is( ':checked' ) == true ) {
                    $( ResObjPai ).find( '#CharpEnsaAmos' ).prop('checked', false );
                };
            };
        });
    });
/*--CHECA ENSAIO DOBRAMENTO 2*/
    $(document).off( 'click', '#Dobram2EnsaAmos' );
    $(document).on( 'click', '#Dobram2EnsaAmos', function(event){
        var vThis = this;
        Core.GetObjtPai( vThis, [ 'AddListAmos', 'EdtListAmos' ], function( ResObjPai ){
            if ( $ ( vThis ).attr( 'id' ) ==  'Dobram2EnsaAmos' ) {
                if ( $( vThis ).is( ':checked' ) == true ) {
                    $( ResObjPai ).find( '#Dobram4EnsaAmos' ).prop('checked', false );
                };
            };
        });
    });
/*--CHECA ENSAIO DOBRAMENTO 4*/
    $(document).off( 'click', '#Dobram4EnsaAmos' );
    $(document).on( 'click', '#Dobram4EnsaAmos', function(event){
        var vThis = this;
        Core.GetObjtPai( vThis, [ 'AddListAmos', 'EdtListAmos' ], function( ResObjPai ){
            if ( $ ( vThis ).attr( 'id' ) ==  'Dobram4EnsaAmos' ) {
                if ( $( vThis ).is( ':checked' ) == true ) {
                    $( ResObjPai ).find( '#Dobram2EnsaAmos' ).prop('checked', false );
                };
            };
        });
    });
/*--CHECA ENSAIO TRAÇÃO 1*/
    $(document).off( 'click', '#Trac1EnsaAmos' );
    $(document).on( 'click', '#Trac1EnsaAmos', function(event){
        var vThis = this;
        Core.GetObjtPai( vThis, [ 'AddListAmos', 'EdtListAmos' ], function( ResObjPai ){
            if ( $ ( vThis ).attr( 'id' ) ==  'Trac1EnsaAmos' ) {
                if ( $( vThis ).is( ':checked' ) == true ) {
                    $( ResObjPai ).find( '#Trac2EnsaAmos' ).prop('checked', false );
                };
            };
        });
    });
/*--CHECA ENSAIO TRAÇÃO 2*/
    $(document).off( 'click', '#Trac2EnsaAmos' );
    $(document).on( 'click', '#Trac2EnsaAmos', function(event){
        var vThis = this;
        Core.GetObjtPai( vThis, [ 'AddListAmos', 'EdtListAmos' ], function( ResObjPai ){
            if ( $ ( vThis ).attr( 'id' ) ==  'Trac2EnsaAmos' ) {
                if ( $( vThis ).is( ':checked' ) == true ) {
                    $( ResObjPai ).find( '#Trac1EnsaAmos' ).prop('checked', false );
                };
            };
        });
    });
/*--EXCLUIR*/
    $(document).off( 'click', '#DeleBtnAmos' );
    $(document).on( 'click', '#DeleBtnAmos', function(event){
        var vLinha = $( this ).parent().parent();
        vFocuAmos = '';
        vThisPerg = this;
        if ( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_stat' ) == 0 ){
            Core.SetMensMenu( 'Exclusão de Amostras', 'DESEJA REALMENTE EXCLUIR ESSE REGISTRO', 'PERGUNTA' );
            Core.MensMenu.show();
        } else if ( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_stat' ) == 1 ){
            Core.SetMensMenu( 'Exclusão de Amostras', 'AMOSTRA EM ANDAMENTO NÃO PODE SER EXCLUIDA', 'AVISO' );
            Core.MensMenu.show();
        } else if ( Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_stat' ) == 2 ){
            Core.SetMensMenu( 'Exclusão de Amostras', 'AMOSTRA CONCLUIDA NÃO PODE SER EXCLUIDA', 'AVISO' );
            Core.MensMenu.show();
        };
    });
/*--BOTÃO SIM PERGUNTA*/
    $(document).off( 'click', '#SimMensMenu' );
    $(document).on( 'click', '#SimMensMenu', function(event){
        Core.MensMenu.hide();
        Core.LoadMenu.show();
        Core.Amostras.SetDeleAmos( vThisPerg, function( vRespAjax ){
            $( '#FiltBtnAmos' ).click();
            Core.LoadMenu.hide();
        });
    });
/*--SALVAR*/
    $(document).off( 'click', '#SalvAmos' );
    $(document).on( 'click', '#SalvAmos', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Amostras.SetSalvAmos( vThis, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Amostras.GetCloseAmos( vThis, function(){
                        vFocuAmos = '';
                        $( '#TabAmos' ).click();
                        $( '#FiltBtnAmos' ).click();
                        Core.LoadMenu.hide();
                    });
                } else {
                    Core.LoadMenu.hide();
                }
            } else {
                Core.LoadMenu.hide();
                $( Resposta.vResObjPai ).find( Resposta.vResObjVali ).focus();
            };
        });
    });
/*--FECHA*/
    $(document).off( 'click', '#FechAmos' );
    $(document).on( 'click', '#FechAmos', function(event){
        Core.LoadMenu.show()
        Core.Amostras.GetCloseAmos( this, function(){
            $( '#TabAmos' ).click();
            $( '#FiltBtnAmos' ).click();
            Core.LoadMenu.hide();
        });
    });
/*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuAmos != '' ){
            $( vFocuAmos ).select();
            $( vFocuAmos ).focus();
        };
    });
/*--IMPRIMIR*/
    $(document).off( 'click', '#ImprBtnAmos' );
    $(document).on( 'click', '#ImprBtnAmos', function(event){
        var vLinha = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Amostras.SetImpreAmos( { 
            evento:{
                IdenAmos: Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_iden' ),
				RGAmos: Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_regi' ),
            }
        }, function( vRespLogi ){
            if ( vRespLogi.status != 'sucesso' ){
                $( '#AlertMenuCont' ).html(
                    '<div id="AlertMenu" class="alert alert-warning alert-dismissible fade" role="alert">' +
                        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                    '</div>'
                );
                $( '#AlertMenu' ).removeClass('alert alert-warning');
                $( '#AlertMenu' ).removeClass('alert alert-danger');
                if ( vRespLogi.status == 'invalido'){
                    $( '#AlertMenu' ).addClass('alert alert-warning');
                } else if ( vRespLogi.status == 'erro'){
                    $( '#AlertMenu' ).addClass('alert alert-danger');
                };
                $( '#AlertMenu' ).prepend( vRespLogi.detalhes );
                $( '#AlertMenu' ).addClass('show');
                $( '#AlertMenu' ).show();
            } else {
                window.open( vRespLogi.registros );
                Core.SetAjax({
			        evento:{
				        ArquiExcl: vRespLogi.registros,
			        }},
			      '../../Laboratorio/Amostras/SetExclArqu/', function( vRespAjax ){
                });
            };            
            $( '#FiltBtnAmos' ).click();
        });
    });
/*--IMPRIMIR CERTIFICADO*/
    $(document).off( 'click', '#CertBtnAmos' );
    $(document).on( 'click', '#CertBtnAmos', function(event){
        var vLinha = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Amostras.SetImpreCertAmos( { 
            evento:{
                sist_para_tenant: Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_tenan' ),
				sist_para_empre: Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_empre' ), 
                amos_cada_iden: Core.Amostras.GetDataTableAmos( '#TableAmos', vLinha, 'amos_cada_iden' ),
                amos_cada_cert: 'TODOS', 
            }
        }, function( vRespLogi ){
            if ( vRespLogi.status != 'sucesso' ){
                $( '#AlertMenuCont' ).html(
                    '<div id="AlertMenu" class="alert alert-warning alert-dismissible fade" role="alert">' +
                        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                    '</div>'
                );
                $( '#AlertMenu' ).removeClass('alert alert-warning');
                $( '#AlertMenu' ).removeClass('alert alert-danger');
                if ( vRespLogi.status == 'invalido'){
                    $( '#AlertMenu' ).addClass('alert alert-warning');
                } else if ( vRespLogi.status == 'erro'){
                    $( '#AlertMenu' ).addClass('alert alert-danger');
                };
                $( '#AlertMenu' ).prepend( vRespLogi.detalhes );
                $( '#AlertMenu' ).addClass('show');
                $( '#AlertMenu' ).show();
            } else {
                window.open( vRespLogi.registros );
                Core.SetAjax({
			        evento:{
				        ArquiExcl: vRespLogi.registros,
			        }},
			      '../../Laboratorio/Amostras/SetExclArqu/', function( vRespAjax ){
                });
            };            
            $( '#FiltBtnAmos' ).click();
        });
    });
});
