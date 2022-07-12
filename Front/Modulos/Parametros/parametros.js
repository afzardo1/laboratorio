/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuArea = '';
    var vThisPerg = '';
    /*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnPara' );
    $(document).on( 'click', '#FiltBtnPara', function(event){
        Core.LoadMenu.show()
        Core.Parametros.GetTablePara( '#TableArea', { 
            evento:{
                sist_para_tenant: $( '#FiltTenanPara' ).val(),
                sist_para_empre: $( '#FiltEmprePara' ).val(),
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
        });
    });
    /*--INICIALIZAÇÃO*/
    Core.LoadMenu.show();
    new nicEditor( { iconsPath : '../../Dependencias/editor/nicEditorIcons.gif', fullPanel : false } ).panelInstance( "CabePara" );
    $('.nicEdit-panelContain').parent().width( 'auto' );
    $('.nicEdit-panelContain').parent().next().width( 'auto' );
    $('.nicEdit-main').width( 'auto' );
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Comum/Parametros/GetTenanPara/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanPara' ), Resposta.registros, function(){
            $( '#FiltTenanPara' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanPara' ).prop( 'disabled', true );
            };
            Core.SetAjax( { evento: 
              { empre_cada_stat: '%%',
                empre_cada_tenant: $( '#FiltTenanPara' ).val() 
              } }, '../../Comum/Parametros/GetEmprePara/', function( Resposta ){
                Core.SetSele2( $( '#FiltEmprePara' ), Resposta.registros, function(){
                    $( '#FiltEmprePara' ).val( Core.Login.GetUsuaSess( 'usua_cada_empre' ) ).trigger( 'change' );
                    if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
                        $( '#FiltEmprePara' ).prop( 'disabled', true );
                    };
                    $( '#FiltBtnPara' ).click();
                });
            });
        });
    });
    /*--FILTRO TENANT*/
    $(document).off( 'change', '#FiltTenanPara' );
    $(document).on( 'change', '#FiltTenanPara', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
           { empre_cada_stat: '%%',
             empre_cada_tenant: $( this ).val() 
           } }, '../../Comum/Parametros/GetEmprePara/', function( Resposta ){
            Core.SetSele2( $( '#FiltEmprePara' ), Resposta.registros, function(){
                Core.LoadMenu.hide();
            });
        });    
    });
    /*--SALVAR*/
    $(document).off( 'click', '#SalvPara' );
    $(document).on( 'click', '#SalvPara', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Parametros.SetSalvPara( vThis, function( Resposta ){
            $( '#FiltBtnPara' ).click();
            Core.LoadMenu.hide();
        });
    });
    /*--FECHA*/
    $(document).off( 'click', '#FechArea' );
    $(document).on( 'click', '#FechArea', function(event){
        Core.LoadMenu.show()
        Core.Areas.GetCloseArea( this, function(){
            $( '#TabArea' ).click();
            $( '#FiltBtnArea' ).click();
            Core.LoadMenu.hide();
        });
    });
    /*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuArea != '' ){
            $( vFocuArea ).select();
            $( vFocuArea ).focus();
        };
    })
    /*--LOGO UPLOAD*/
    $(document).off( 'change', '#LogoPara' );
    $(document).on( 'change', '#LogoPara', function(e){
        Core.LoadMenu.show()
        var Vthis = this;
        $( this ).parent().find( '#LabeLogoPara' ).html( e.target.files[0].name ) 
        var reader = new FileReader();
        reader.readAsDataURL( e.target.files[0] );
        reader.onload = function () {
            $( Vthis ).attr( 'data-arqu', reader.result );
            Core.LoadMenu.hide();
        };
    });
    /*--SELO UPLOAD*/
    $(document).off( 'change', '#SeloPara' );
    $(document).on( 'change', '#SeloPara', function(e){
        Core.LoadMenu.show()
        var Vthis = this;
        $( this ).parent().find( '#LabeSeloPara' ).html( e.target.files[0].name ) 
        var reader = new FileReader();
        reader.readAsDataURL( e.target.files[0] );
        reader.onload = function () {
            $( Vthis ).attr( 'data-arqu', reader.result );
            Core.LoadMenu.hide();
        };
    });
});
