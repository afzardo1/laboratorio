/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuConcl = '';
    var vThisPerg = '';
    /*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnConcl' );
    $(document).on( 'click', '#FiltBtnConcl', function(event){
        Core.LoadMenu.show()
        Core.Conclusoes.GetTableConcl( '#TableConcl', { 
            evento:{
                labo_amos_concl_tenan: $( '#FiltTenanConcl' ).val(),
                labo_amos_concl_empre: $( '#FiltEmpreConcl' ).val(),
                labo_amos_concl_codi_apeli: '%' + $( '#FiltDadoConcl' ).val() + '%',
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
            $( '#FiltDadoConcl' ).focus();
        });
    });
    /*--INICIALIZAÇÃO*/
    Core.LoadMenu.show();
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Laboratorio/Conclusoes/GetTenanAmosConcl/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanConcl' ), Resposta.registros, function(){
            $( '#FiltTenanConcl' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanConcl' ).prop( 'disabled', true );
            };
            Core.SetAjax( { evento: 
              { empre_cada_stat: '%%',
                empre_cada_tenant: $( '#FiltTenanConcl' ).val() 
              } }, '../../Laboratorio/Conclusoes/GetEmpreAmosConcl/', function( Resposta ){
                Core.SetSele2( $( '#FiltEmpreConcl' ), Resposta.registros, function(){
                    $( '#FiltEmpreConcl' ).val( Core.Login.GetUsuaSess( 'usua_cada_empre' ) ).trigger( 'change' );
                    if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
                        $( '#FiltEmpreConcl' ).prop( 'disabled', true );
                    };
                    $( '#FiltBtnConcl' ).click();
                });
            });
        });
    });
    /*--FILTRO TENANT*/
    $(document).off( 'change', '#FiltTenanConcl' );
    $(document).on( 'change', '#FiltTenanConcl', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
           { empre_cada_stat: '%%',
             empre_cada_tenant: $( this ).val() 
           } }, '../../Laboratorio/Conclusoes/GetEmpreAmosConcl/', function( Resposta ){
            Core.SetSele2( $( '#FiltEmpreConcl' ), Resposta.registros, function(){
                Core.LoadMenu.hide();
            });
        });    
    });
    /*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltDadoConcl' );
    $(document).on( 'keypress', '#FiltDadoConcl', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnConcl' ).click();
        }
    });
    /*--ADICIONA*/
    $(document).off( 'click', '#AddBtnConcl' );
    $(document).on( 'click', '#AddBtnConcl', function(event){
        Core.LoadMenu.show()
        Core.Conclusoes.GetAddConcl( this, function( ResObjPai ){
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#ApelConcl' ).focus();
        });
    });
    /*--EDITA*/
    $(document).off( 'click', '#EditBtnConcl' );
    $(document).on( 'click', '#EditBtnConcl', function(event){
        Core.LoadMenu.show()
        Core.Conclusoes.GetEdtConcl( this, function( ResObjPai ){
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#ApelConcl' ).focus();          
        });
    });
    /*--TENANT*/
    $(document).off( 'change', '#TenanConcl' );
    $(document).on( 'change', '#TenanConcl', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
           { empre_cada_stat: '%%',
             empre_cada_tenant: $( this ).val() 
           } }, '../../Laboratorio/Conclusoes/GetEmpreAmosConcl/', function( Resposta ){
            Core.SetSele2( $( '#EmpreConcl' ), Resposta.registros, function(){
                Core.LoadMenu.hide();
            });
        });    
    });
    /*--EXCLUIR*/
    $(document).off( 'click', '#DeleBtnConcl' );
    $(document).on( 'click', '#DeleBtnConcl', function(event){
        var vLinha = $( this ).parent().parent();
        vFocuConcl = '';
        vThisPerg = this;
        Core.SetMensMenu( 'Exclusão de Conclusôes', 'DESEJA REALMENTE EXCLUIR ESSE REGISTRO', 'PERGUNTA' );
        Core.MensMenu.show();
    });
    /*--BOTÃO SIM PERGUNTA*/
    $(document).off( 'click', '#SimMensMenu' );
    $(document).on( 'click', '#SimMensMenu', function(event){
        Core.MensMenu.hide();
        Core.LoadMenu.show();
        Core.Conclusoes.SetDeleConcl( vThisPerg, function( vRespAjax ){
            $( '#FiltBtnConcl' ).click();
            Core.LoadMenu.hide();
        });
    });
    /*--SALVAR*/
    $(document).off( 'click', '#SalvConcl' );
    $(document).on( 'click', '#SalvConcl', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Conclusoes.SetSalvConcl( vThis, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Conclusoes.GetCloseConcl( vThis, function(){
                        vFocuConcl = '';
                        $( '#TabConcl' ).click();
                        $( '#FiltBtnConcl' ).click();
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
    $(document).off( 'click', '#FechConcl' );
    $(document).on( 'click', '#FechConcl', function(event){
        Core.LoadMenu.show()
        Core.Conclusoes.GetCloseConcl( this, function(){
            $( '#TabConcl' ).click();
            $( '#FiltBtnConcl' ).click();
            Core.LoadMenu.hide();
        });
    });
    /*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuConcl != '' ){
            $( vFocuConcl ).select();
            $( vFocuConcl ).focus();
        };
    })
});
