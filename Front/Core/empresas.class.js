/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel pela Empresas
 * do sistema
 *
 * @package    Empresas
 * @author     Alexandre Farinelli Zardo
 * @copyright  (c) 2021 Megatron
*/
export default class Empresas {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTableEmpre( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();

		switch ( vCampo ){ 
			case 'empre_cada_iden': 
				return vTabela.cell( vLinha, 1 ).data();
				break;
			case 'empre_cada_nome':
				return vTabela.cell( vLinha, 2 ).data();
				break;
			case 'empre_cada_docu':
				return vTabela.cell( vLinha, 3 ).data();
				break;
			case 'empre_cada_usua_nome_iden':
				return vTabela.cell( vLinha, 4 ).data();
				break;
			case 'empre_cada_stat':
				return vTabela.cell( vLinha, 5 ).data();
				break;
			case 'empre_cada_docu_esta':
				return vTabela.cell( vLinha, 6 ).data();
				break;
			case 'empre_cada_cep':
				return vTabela.cell( vLinha, 7 ).data();
				break;
			case 'empre_cada_ende':
				return vTabela.cell( vLinha, 8 ).data();
				break;
			case 'empre_cada_nume':
				return vTabela.cell( vLinha, 9 ).data();
				break;
			case 'empre_cada_bairo':
				return vTabela.cell( vLinha, 10 ).data();
				break;
			case 'empre_cada_cida':
				return vTabela.cell( vLinha, 11 ).data();
				break;
			case 'empre_cada_esta':
				return vTabela.cell( vLinha, 12 ).data();
				break;
			case 'empre_cada_usua_iden':
				return vTabela.cell( vLinha, 13 ).data();
				break;
			case 'empre_cada_tenant':
				return vTabela.cell( vLinha, 14 ).data();
				break;
		};
	};
	
	/**
	 * Inicia Tabela com os dados 
	 *
	 * @param  vTabela - Id Tabela que sera implementada
	 * @param  vFiltros - Array contendo os filtros
	 * @param  vResp - Calback
	 * @return Calback
	 * @access public
	*/
	static GetTableEmpre( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Comum/Empresas/GetEmpre/', function( vRespAjax ){
				if ( vRespAjax.status == 'sucesso' ){
					vTabela = $( vTabela ).DataTable({
						fixedHeader: true,
						info: true,
						scrollCollapse: true,
						retrieve: true,
						responsive: true,
						data: vRespAjax.registros,
						select: { style: 'single' },
						ordering: true,
						order: [ [ 2, 'asc' ] ],
						columns: [
							{ data: 'empre_cada_boto' },
							{ data: 'empre_cada_iden' },
							{ data: 'empre_cada_nome' },
							{ data: 'empre_cada_docu' },
							{ data: 'empre_cada_usua_nome_iden' },
							{ data: 'empre_cada_stat', render: function(d) {
								if ( d == 0 ) {
									return 'INATIVO';
								} else if ( d == 1 ) {
									return 'ATIVO';
								};
							} },
							{ data: 'empre_cada_docu_esta', visible: false },
							{ data: 'empre_cada_cep', visible: false },
							{ data: 'empre_cada_ende', visible: false },
							{ data: 'empre_cada_nume', visible: false },
							{ data: 'empre_cada_bairo', visible: false },
							{ data: 'empre_cada_cida', visible: false },
							{ data: 'empre_cada_esta', visible: false },
							{ data: 'empre_cada_usua_iden', visible: false },
							{ data: 'empre_cada_tenant', visible: false },
						], 
						language: {
							"decimal": ",",
							"thousands": ".",
							"sEmptyTable": "Nenhum registro encontrado",
							"sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
							"sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
							"sInfoFiltered": "(Filtrados de _MAX_ registros)",
							"sInfoPostFix": "",
							"sInfofoThousands": ".",
							"sLengthMenu": "_MENU_ resultados por página",
							"sLoadingRecords": "Carregando...",
							"sProcessing": "Processando...",
							"sZeroRecords": "Nenhum registro encontrado",
							"sSearch": "Pesquisar",
							"oPaginate": {
								"sNext": "Próximo",
								"sPrevious": "Anterior",
								"sFirst": "Primeiro",
								"sLast": "Último"
							},
							"oAria": {
								"sSortAscending": ": Ordenar colunas de forma ascendente",
								"sSortDescending": ": Ordenar colunas de forma descendente"
							},
							"select": {
								"rows": {
								"_": "Selecionado %d linhas",
								"0": "Nenhuma linha selecionada",
								"1": "Selecionado 1 linha"
								},
							},
						},
						createdRow: function( row, data, dataIndex ) {
							if ( data[ 'empre_cada_stat' ] == 0 ) {
								$( row ).addClass( 'bg-danger' );
							};
						},
					});
					vTabela.clear();
					vTabela.rows.add( vRespAjax.registros );
					vTabela.draw();
				} else {
					vTabela = $( vTabela ).DataTable();
				};
				vTabela.columns.adjust();			
				vResp ( vRespAjax );
			}
		);
		$( vTabela ).on( 'click', 'tbody tr', function () {
			//$('.selected').removeClass('selected');
			$( this ).toggleClass( 'selected' );
		});
	};

	/**
	 * Método para gerar formulario
	 * no sistema
	 * 
	 * @return Aba e formulário
	 * @access public
	*/
	static GetForm( vResObjPai, vAba, vApelido, vResp ) {
		if ( $( vResObjPai ).find( '#' + vAba + 'TabEmpre' ).length == 0 ){
			$( vResObjPai ).find( 'ul' ).append(
				'<li class="nav-item" role="presentation">' +
					'<button class="nav-link" id="' + vAba + 'TabEmpre" data-bs-toggle="tab" data-bs-target="#' + vAba + 'ListEmpre" type="button" role="tab" aria-controls="home" aria-selected="true"> <i class="far fa-building"></i> ' + vApelido + ' </button>' +
				'</li>'
			);
			$( vResObjPai ).find( 'div:eq(0)' ).append(
				'<div class="tab-pane fade" id="' + vAba + 'ListEmpre" role="tabpanel" aria-labelledby="' + vAba + '-tab-Empresas">' +
					'<div class="row p-3" >' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="IdenEmpre" value="Automatico" disabled>' +
								'<label for="IdenEmpre">ID Reg.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-4">' +
							'<div class="input-group input-group-lg">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="DocEmpre" value="" placeholder="" maxlength="20" required uppercase autofocus data-obriga="S" aria-describedby="CnpjBntEmpre">' +
									'<label for="DocEmpre">CNPJ ou CPF.</label>' +
								'</div>' +
								'<button id="ConsuCnpjBntEmpre" class="btn btn-outline-secondary" type="button">Consultar</button>' +
							'</div>' +
							'<div id="AlerDocEmpre" class="invalid-feedback">' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-4">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="DocEstEmpre" value="" placeholder="" maxlength="20" uppercase>' +
								'<label for="DocEstEmpre">Insc. Est. ou RG.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-1"></div>' +
						'<div class="col-xl-2">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="StatEmpre" aria-label="Floating label select example">' +
									'<option value="0">INATIVO</option>' +
									'<option value="1" selected>ATIVO</option>' +
							  	'</select>' +
								'<label for="StatEmpre">Status</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="NomeEmpre" value="" placeholder="" maxlength="150" required uppercase data-obriga="S">' +
								'<label for="NomeEmpre">Nome</label>' +
								'<div class="invalid-feedback">' +
									'Nome da Empresa não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-3">' +
							'<div class="input-group input-group-lg">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="CepEmpre" placeholder="00.000-000" uppercase>' +
									'<label for="CepEmpre">CEP</label>' +
								'</div>' +
								'<button id="ConsuCepBntEmpre" class="btn btn-outline-secondary" type="button">Consultar</button>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-8">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="EndeEmpre" value="" placeholder="Rua ou Avenida ou Travessa" maxlength="150" uppercase>' +
								'<label for="EndeEmpre">Endereço</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="NumeEmpre" value="" placeholder="" maxlength="10" uppercase>' +
								'<label for="NumeEmpre">Numero</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="CidaEmpre" value="" placeholder="" maxlength="100" uppercase>' +
								'<label for="CidaEmpre">Cidade</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="BairroEmpre" value="" placeholder="" maxlength="100" uppercase>' +
								'<label for="BairroEmpre">Bairro</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-4">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="EstEmpre" aria-label="Floating label select example">' +
									'<option value="AC">AC</option>' +
									'<option value="AL">AL</option>' +
									'<option value="AP">AP</option>' +
									'<option value="AM">AM</option>' +
									'<option value="BA">BA</option>' +
									'<option value="CE">CE</option>' +
									'<option value="DF">DF</option>' +
									'<option value="ES">ES</option>' +
									'<option value="GO">GO</option>' +
									'<option value="MA">MA</option>' +
									'<option value="MT">MT</option>' +
									'<option value="MS">MS</option>' +
									'<option value="MG">MG</option>' +
									'<option value="PA">PA</option>' +
									'<option value="PB">PB</option>' +
									'<option value="PR">PR</option>' +
									'<option value="PE">PE</option>' +
									'<option value="PI">PI</option>' +
									'<option value="RJ">RJ</option>' +
									'<option value="RN">RN</option>' +
									'<option value="RS">RS</option>' +
									'<option value="RO">RO</option>' +
									'<option value="RR">RR</option>' +
									'<option value="SC">SC</option>' +
									'<option value="SP" selected>SP</option>' +
									'<option value="SE">SE</option>' +
									'<option value="TO">TO</option>' +
						  		'</select>' +
								'<label for="EstEmpre">Estado</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +	
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="RespEmpre">Responsavel</label>' +
								'<select class="form-select" id="RespEmpre" aria-label="Floating label select example" required uppercase>' +
						  		'</select>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="TenanEmpre">Tenant</label>' +
								'<select class="form-select" id="TenanEmpre" aria-label="Floating label select example" required uppercase>' +
								'</select>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</br>' +
					'</br>' +
					'</br>' +
					'<div class="fixed-bottom d-flex justify-content-center">' + 
						'<button id="SalvEmpre" type="button" class="btn btn-lg btn-success me-1"> <i class="fas fa-save"></i> Salvar </button>' +
						'<button id="FechEmpre"type="button" class="btn btn-lg btn-primary"> <i class="fas fa-door-open"></i> Sair </button>' +
					'</div>' +
				'</div>'
			);
		};
		$( vResObjPai ).find( '#' + vAba + 'TabEmpre' ).click();
		vResp( $( vResObjPai ).find( '#' + vAba + 'ListEmpre' ) );
	}
	
	/**
	 * Método para incluir
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static GetAddEmpre( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'FormEmpre' ], function( ResObjPai ){
			Empresas.GetForm( ResObjPai, 'Add', 'INCLUSÃO EMPRESA', function( ResObjPai ){
				Core.SetAjax( { evento: { usua_cada_status: '1' } }, '../../Comum/Empresas/GetUsuaEmpre/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#RespEmpre' ), Resposta.registros, function(){
						Core.SetAjax( { evento: { tenant_cada_stat: '1' } }, '../../Comum/Empresas/GetTenanEmpre/', function( Resposta ){
							Core.SetSele2( $( ResObjPai ).find( '#TenanEmpre' ), Resposta.registros, function(){
								Core.ValiDocu( $( ResObjPai ).find( '#DocEmpre' ) );
								Core.SetMask( '#CepEmpre', 'CEP' );
								if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
									$( ResObjPai ).find( '#TenanEmpre' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
									$( ResObjPai ).find( '#TenanEmpre' ).prop( 'disabled', true );
								};
								setTimeout( function(){
									vResp( ResObjPai );
								}, 300);
							});
						});
					});
				});				
			});
		});
	};

	/**
	 * Método para alterar
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static GetEdtEmpre( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.GetObjtPai( VThis, [ 'FormEmpre' ], function( ResObjPai ){
			Empresas.GetForm( ResObjPai, 'Edt', 'ALTERAÇÃO EMPRESA', function( ResObjPai ){
				Core.SetAjax( { evento: { usua_cada_status: '%%' } }, '../../Comum/Empresas/GetUsuaEmpre/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#RespEmpre' ), Resposta.registros, function(){
						Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Comum/Empresas/GetTenanEmpre/', function( Resposta ){
							Core.SetSele2( $( ResObjPai ).find( '#TenanEmpre' ), Resposta.registros, function(){
								$( ResObjPai ).find( '#IdenEmpre' ).val(  Core.Empresas.GetDataTableEmpre( '#TableEmpre', vLinha, 'empre_cada_iden' ) );
								$( ResObjPai ).find( '#DocEmpre' ).val(  Core.Empresas.GetDataTableEmpre( '#TableEmpre', vLinha, 'empre_cada_docu' ) );
								$( ResObjPai ).find( '#DocEstEmpre' ).val(  Core.Empresas.GetDataTableEmpre( '#TableEmpre', vLinha, 'empre_cada_docu_esta' ) );
								$( ResObjPai ).find( '#NomeEmpre' ).val(  Core.Empresas.GetDataTableEmpre( '#TableEmpre', vLinha, 'empre_cada_nome' ) );
								$( ResObjPai ).find( '#CepEmpre' ).val(  Core.Empresas.GetDataTableEmpre( '#TableEmpre', vLinha, 'empre_cada_cep' ) );
								$( ResObjPai ).find( '#EndeEmpre' ).val(  Core.Empresas.GetDataTableEmpre( '#TableEmpre', vLinha, 'empre_cada_ende' ) );
								$( ResObjPai ).find( '#NumeEmpre' ).val(  Core.Empresas.GetDataTableEmpre( '#TableEmpre', vLinha, 'empre_cada_nume' ) );
								$( ResObjPai ).find( '#BairroEmpre' ).val(  Core.Empresas.GetDataTableEmpre( '#TableEmpre', vLinha, 'empre_cada_bairo' ) );
								$( ResObjPai ).find( '#CidaEmpre' ).val(  Core.Empresas.GetDataTableEmpre( '#TableEmpre', vLinha, 'empre_cada_cida' ) );
								$( ResObjPai ).find( '#StatEmpre' ).val(  Core.Empresas.GetDataTableEmpre( '#TableEmpre', vLinha, 'empre_cada_stat' ) ).trigger( 'change' );
								$( ResObjPai ).find( '#RespEmpre' ).val(  Core.Empresas.GetDataTableEmpre( '#TableEmpre', vLinha, 'empre_cada_usua_iden' ) ).trigger( 'change' );
								$( ResObjPai ).find( '#EstEmpre' ).val(  Core.Empresas.GetDataTableEmpre( '#TableEmpre', vLinha, 'empre_cada_esta' ) ).trigger( 'change' );
								$( ResObjPai ).find( '#TenanEmpre' ).val(  Core.Empresas.GetDataTableEmpre( '#TableEmpre', vLinha, 'empre_cada_tenant' ) ).trigger( 'change' );
								Core.SetMask( '#CepEmpre', 'CEP' );
								if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
									$( ResObjPai ).find( '#TenanEmpre' ).prop( 'disabled', true );
								};
								setTimeout( function(){
									vResp( ResObjPai );
								}, 300);
							});
						});
					})
				})
			});
		});
	};

	/**
	 * Método para sair tela
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static GetCloseEmpre( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListEmpre', 'EdtListEmpre' ], function( ResObjPai ){
			$( '#' + $( ResObjPai ).attr( 'id' ).replace( 'List', 'Tab' ) ).remove();
			$( ResObjPai ).remove();
			vResp( ResObjPai );
		});
	};

	/**
	 * Método para salvar
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static SetSalvEmpre( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListEmpre', 'EdtListEmpre' ], function( ResObjPai ){
			Core.GetCampObri( ResObjPai, [ '' ], '[data-obriga="S"]', function( ResObjVali ){
				$( '.has-validated' ).removeClass( 'has-validated' );
                $( '.is-invalid' ).removeClass( 'is-invalid' );
				if ( ResObjVali != 'validado' ){
					$( ResObjVali ).parent().addClass( 'has-validated' );
                    $( ResObjVali ).addClass( 'is-invalid' );
					setTimeout( function(){
						vResp( { vResObjPai: ResObjPai, vResObjVali: ResObjVali } );
					}, 300);
                } else {
					Core.SetAjax({
						evento:{
							IdenEmpre: $( ResObjPai ).find( '#IdenEmpre' ).val(),
							DocEmpre: $( ResObjPai ).find( '#DocEmpre' ).val(),
							DocEstEmpre: $( ResObjPai ).find( '#DocEstEmpre' ).val(),
							StatEmpre: $( ResObjPai ).find( '#StatEmpre' ).val(),
							NomeEmpre: $( ResObjPai ).find( '#NomeEmpre' ).val(),
							CepEmpre: $( ResObjPai ).find( '#CepEmpre' ).val(),
							EndeEmpre: $( ResObjPai ).find( '#EndeEmpre' ).val(),
							NumeEmpre: $( ResObjPai ).find( '#NumeEmpre' ).val(),
							CidaEmpre: $( ResObjPai ).find( '#CidaEmpre' ).val(),
							BairroEmpre: $( ResObjPai ).find( '#BairroEmpre' ).val(),
							EstEmpre: $( ResObjPai ).find( '#EstEmpre' ).val(),
							RespEmpre: $( ResObjPai ).find( '#RespEmpre' ).val(),
							TenanEmpre: $( ResObjPai ).find( '#TenanEmpre' ).val(),
						}},
						'../../Comum/Empresas/SetSalvEmpre/', function( vRespAjax ){
							Core.SetMensMenu( vRespAjax.detalhes, vRespAjax.registros, 'AVISO')
							Core.MensMenu.show();
							setTimeout( function(){
								vResp( { vResObjPai: ResObjPai, vRespAjax: vRespAjax } );
							}, 300);
						},
					);
				};
			})
		});
	};

	/**
	 * Método para excluir
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static SetDeleEmpre( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.SetAjax({
			evento:{
				IdenEmpre: Core.Empresas.GetDataTableEmpre( '#TableEmpre', vLinha, 'empre_cada_iden' ),
			}},
			'../../Comum/Empresas/SetDeleEmpre/', function( vRespAjax ){
				Core.SetMensMenu( vRespAjax.detalhes, vRespAjax.registros, 'AVISO')
				Core.MensMenu.show();
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};

	/**
	 * Método para retornar dados CNPJ
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static GetCnpjEmpre( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'FormEmpre' ], function( ResObjPai ){
			if ( ( $( ResObjPai ).find( '#DocEmpre' ).val() != '' ) && ( $( ResObjPai ).find( '#DocEmpre ').hasClass( 'is-invalid' ) == false ) ) {
				Core.ChkValDoc( $( ResObjPai ).find( '#DocEmpre' ).val().replace(/[^\d]+/g,''), function( ResChkValDoc ){
					$( ResObjPai ).find( '#NomeEmpre' ).val( ResChkValDoc.registros.nome );
					$( ResObjPai ).find( '#CepEmpre' ).val( ResChkValDoc.registros.cep );
					$( ResObjPai ).find( '#EndeEmpre' ).val( ResChkValDoc.registros.logradouro );
					$( ResObjPai ).find( '#NumeEmpre' ).val( ResChkValDoc.registros.numero );
					$( ResObjPai ).find( '#CidaEmpre' ).val( ResChkValDoc.registros.municipio );
					$( ResObjPai ).find( '#BairroEmpre' ).val( ResChkValDoc.registros.bairro );
					setTimeout( function(){
						vResp( ResObjPai );
					}, 300);
				});
			} else {
				setTimeout( function(){
					vResp( ResObjPai );
				}, 300);
			};
		});
	};

/**
	 * Método para retornar dados CEP
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static GetCepEmpre( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'FormEmpre' ], function( ResObjPai ){
			if ( ( $( ResObjPai ).find( '#CepEmpre' ).val() != '' ) && ( $( ResObjPai ).find( '#CepEmpre ').hasClass( 'is-invalid' ) == false ) ) {
				Core.GetCepEnde( $( ResObjPai ).find( '#CepEmpre' ).val().replace(/[^\d]+/g,''), function( ResCep ){
					$( ResObjPai ).find( '#EndeEmpre' ).val( ResCep.registros.logradouro );
					$( ResObjPai ).find( '#CidaEmpre' ).val( ResCep.registros.localidade );
					$( ResObjPai ).find( '#BairroEmpre' ).val( ResCep.registros.bairro );
					$( ResObjPai ).find( '#EstEmpre' ).val( ResCep.registros.uf );
					setTimeout( function(){
						vResp( ResObjPai );
					}, 300);
				});
			} else {
				setTimeout( function(){
					vResp( ResObjPai );
				}, 300);
			};
		});
	};
};