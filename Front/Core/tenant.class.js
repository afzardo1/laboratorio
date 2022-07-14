/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel pela Tenant
 * do sistema
 *
 * @package    Tenant
 * @author     Alexandre Farinelli Zardo
 * @copyright  (c) 2021 Megatron
*/
export default class Tenant {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTableTenan( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();

		switch ( vCampo ){ 
			case 'tenant_cada_iden': 
				return vTabela.cell( vLinha, 1 ).data();
				break;
			case 'tenant_cada_nome':
				return vTabela.cell( vLinha, 2 ).data();
				break;
			case 'tenant_cada_docu':
				return vTabela.cell( vLinha, 3 ).data();
				break;
			case 'tenant_cada_usua_nome_iden':
				return vTabela.cell( vLinha, 4 ).data();
				break;
			case 'tenant_cada_stat':
				return vTabela.cell( vLinha, 5 ).data();
				break;
			case 'tenant_cada_docu_esta':
				return vTabela.cell( vLinha, 6 ).data();
				break;
			case 'tenant_cada_cep':
				return vTabela.cell( vLinha, 7 ).data();
				break;
			case 'tenant_cada_ende':
				return vTabela.cell( vLinha, 8 ).data();
				break;
			case 'tenant_cada_nume':
				return vTabela.cell( vLinha, 9 ).data();
				break;
			case 'tenant_cada_bairo':
				return vTabela.cell( vLinha, 10 ).data();
				break;
			case 'tenant_cada_cida':
				return vTabela.cell( vLinha, 11 ).data();
				break;
			case 'tenant_cada_esta':
				return vTabela.cell( vLinha, 12 ).data();
				break;
			case 'tenant_cada_usua_iden':
				return vTabela.cell( vLinha, 13 ).data();
				break;
			case 'tenant_cada_perso_certi':
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
	static GetTableTenan( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Comum/Tenant/GetTenan/', function( vRespAjax ){
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
							{ data: 'tenant_cada_boto' },
							{ data: 'tenant_cada_iden' },
							{ data: 'tenant_cada_nome' },
							{ data: 'tenant_cada_docu' },
							{ data: 'tenant_cada_usua_nome_iden' },
							{ data: 'tenant_cada_stat', render: function(d) {
								if ( d == 0 ) {
									return 'INATIVO';
								} else if ( d == 1 ) {
									return 'ATIVO';
								};
							} },
							{ data: 'tenant_cada_docu_esta', visible: false },
							{ data: 'tenant_cada_cep', visible: false },
							{ data: 'tenant_cada_ende', visible: false },
							{ data: 'tenant_cada_nume', visible: false },
							{ data: 'tenant_cada_bairo', visible: false },
							{ data: 'tenant_cada_cida', visible: false },
							{ data: 'tenant_cada_esta', visible: false },
							{ data: 'tenant_cada_usua_iden', visible: false },
							{ data: 'tenant_cada_perso_certi', visible: false },
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
							if ( data[ 'tenant_cada_stat' ] == 0 ) {
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
			$('.selected').removeClass('selected');
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
		if ( $( vResObjPai ).find( '#' + vAba + 'TabTenan' ).length == 0 ){
			$( vResObjPai ).find( 'ul' ).append(
				'<li class="nav-item" role="presentation">' +
					'<button class="nav-link" id="' + vAba + 'TabTenan" data-bs-toggle="tab" data-bs-target="#' + vAba + 'ListTenan" type="button" role="tab" aria-controls="home" aria-selected="true"> <i class="fas fa-user-plus"></i> ' + vApelido + ' </button>' +
				'</li>'
			);
			$( vResObjPai ).find( 'div:eq(0)' ).append(
				'<div class="tab-pane fade" id="' + vAba + 'ListTenan" role="tabpanel" aria-labelledby="' + vAba + '-tab-Tenanrios">' +
					'<div class="row p-3" >' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="IdenTenan" value="Automatico" disabled>' +
								'<label for="IdenTenan">ID Reg.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-4">' +
							'<div class="input-group input-group-lg">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="DocTenan" value="" placeholder="" required uppercase autofocus data-obriga="S" aria-describedby="CnpjBntTenan">' +
									'<label for="DocTenan">CNPJ ou CPF.</label>' +
								'</div>' +
								'<button id="ConsuCnpjBntTenan" class="btn btn-outline-secondary" type="button">Consultar</button>' +
							'</div>' +
							'<div id="AlerDocTenan" class="invalid-feedback">' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-4">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="DocEstTenan" value="" placeholder="" maxlength="20" uppercase>' +
								'<label for="DocEstTenan">Insc. Est. ou RG.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-1"></div>' +
						'<div class="col-xl-2">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="StatTenan" aria-label="Floating label select example">' +
									'<option value="0">INATIVO</option>' +
									'<option value="1" selected>ATIVO</option>' +
							  	'</select>' +
								'<label for="StatTenan">Status</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-12">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="NomeTenan" value="" placeholder="" maxlength="150" required uppercase data-obriga="S">' +
								'<label for="NomeTenan">Nome</label>' +
								'<div class="invalid-feedback">' +
									'Nome da tenant não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-3">' +
							'<div class="input-group input-group-lg">' +
								'<div class="form-floating">' +
									'<input type="text" class="form-control" id="CepTenan" placeholder="00.000-000" uppercase>' +
									'<label for="CepTenan">CEP</label>' +
								'</div>' +
								'<button id="ConsuCepBntTenan" class="btn btn-outline-secondary" type="button">Consultar</button>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-8">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="EndeTenan" value="" placeholder="Rua ou Avenida ou Travessa" maxlength="150" uppercase>' +
								'<label for="EndeTenan">Endereço</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="NumeTenan" value="" placeholder="" maxlength="10" uppercase>' +
								'<label for="NumeTenan">Numero</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="CidaTenan" value="" placeholder="" maxlength="100" uppercase>' +
								'<label for="CidaTenan">Cidade</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="BairroTenan" value="" placeholder="" maxlength="100" uppercase>' +
								'<label for="BairroTenan">Bairro</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-2">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="EstTenan" aria-label="Floating label select example">' +
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
								'<label for="EstTenan">Estado</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-2">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="PersoTenan" aria-label="Floating label select example">' +
									'<option value="0" selected>PADRÃO</option>' +
									'<option value="1">PERSONALIZADO</option>' +
						  		'</select>' +
								'<label for="PersoTenan">Certificado</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-8">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="RespTenan">Responsavel</label>' +
								'<select class="form-select" id="RespTenan" aria-label="Floating label select example" required uppercase>' +
						  		'</select>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</br>' +
					'</br>' +
					'</br>' +
					'<div class="fixed-bottom d-flex justify-content-center">' + 
						'<button id="SalvTenan" type="button" class="btn btn-lg btn-success me-1"> <i class="fas fa-save"></i> Salvar </button>' +
						'<button id="FechTenan"type="button" class="btn btn-lg btn-primary"> <i class="fas fa-door-open"></i> Sair </button>' +
					'</div>' +
				'</div>'
			);
		};
		$( vResObjPai ).find( '#' + vAba + 'TabTenan' ).click();
		vResp( $( vResObjPai ).find( '#' + vAba + 'ListTenan' ) );
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
	static GetAddTenan( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'FormTenan' ], function( ResObjPai ){
			Tenant.GetForm( ResObjPai, 'Add', 'INCLUSÃO TENANT', function( ResObjPai ){
				Core.SetAjax( { evento: { usua_cada_status: '1' } }, '../../Comum/Tenant/GetUsuaTenan/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#RespTenan' ), Resposta.registros, function(){
						Core.ValiDocu( $( ResObjPai ).find( '#DocTenan' ) );
						Core.SetMask( '#CepTenan', 'CEP' );
						setTimeout( function(){
							vResp( ResObjPai );
						}, 300);
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
	static GetEdtTenan( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.GetObjtPai( VThis, [ 'FormTenan' ], function( ResObjPai ){
			Tenant.GetForm( ResObjPai, 'Edt', 'ALTERAÇÃO TENANT', function( ResObjPai ){
				Core.SetAjax( { evento: { usua_cada_status: '%%' } }, '../../Comum/Tenant/GetUsuaTenan/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#RespTenan' ), Resposta.registros, function(){
						$( ResObjPai ).find( '#IdenTenan' ).val(  Core.Tenant.GetDataTableTenan( '#TableTenan', vLinha, 'tenant_cada_iden' ) );
						$( ResObjPai ).find( '#DocTenan' ).val(  Core.Tenant.GetDataTableTenan( '#TableTenan', vLinha, 'tenant_cada_docu' ) );
						$( ResObjPai ).find( '#DocEstTenan' ).val(  Core.Tenant.GetDataTableTenan( '#TableTenan', vLinha, 'tenant_cada_docu_esta' ) );
						$( ResObjPai ).find( '#NomeTenan' ).val(  Core.Tenant.GetDataTableTenan( '#TableTenan', vLinha, 'tenant_cada_nome' ) );
						$( ResObjPai ).find( '#CepTenan' ).val(  Core.Tenant.GetDataTableTenan( '#TableTenan', vLinha, 'tenant_cada_cep' ) );
						$( ResObjPai ).find( '#EndeTenan' ).val(  Core.Tenant.GetDataTableTenan( '#TableTenan', vLinha, 'tenant_cada_ende' ) );
						$( ResObjPai ).find( '#NumeTenan' ).val(  Core.Tenant.GetDataTableTenan( '#TableTenan', vLinha, 'tenant_cada_nume' ) );
						$( ResObjPai ).find( '#BairroTenan' ).val(  Core.Tenant.GetDataTableTenan( '#TableTenan', vLinha, 'tenant_cada_bairo' ) );
						$( ResObjPai ).find( '#CidaTenan' ).val(  Core.Tenant.GetDataTableTenan( '#TableTenan', vLinha, 'tenant_cada_cida' ) );
						$( ResObjPai ).find( '#StatTenan' ).val(  Core.Tenant.GetDataTableTenan( '#TableTenan', vLinha, 'tenant_cada_stat' ) ).trigger( 'change' );
						$( ResObjPai ).find( '#RespTenan' ).val(  Core.Tenant.GetDataTableTenan( '#TableTenan', vLinha, 'tenant_cada_usua_iden' ) ).trigger( 'change' );
						$( ResObjPai ).find( '#EstTenan' ).val(  Core.Tenant.GetDataTableTenan( '#TableTenan', vLinha, 'tenant_cada_esta' ) ).trigger( 'change' );
						$( ResObjPai ).find( '#PersoTenan' ).val(  Core.Tenant.GetDataTableTenan( '#TableTenan', vLinha, 'tenant_cada_perso_certi' ) ).trigger( 'change' );
						Core.SetMask( '#CepTenan', 'CEP' );
						setTimeout( function(){
							vResp( ResObjPai );
						}, 300);
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
	static GetCloseTenan( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListTenan', 'EdtListTenan' ], function( ResObjPai ){
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
	static SetSalvTenan( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListTenan', 'EdtListTenan' ], function( ResObjPai ){
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
							IdenTenan: $( ResObjPai ).find( '#IdenTenan' ).val(),
							DocTenan: $( ResObjPai ).find( '#DocTenan' ).val(),
							DocEstTenan: $( ResObjPai ).find( '#DocEstTenan' ).val(),
							StatTenan: $( ResObjPai ).find( '#StatTenan' ).val(),
							NomeTenan: $( ResObjPai ).find( '#NomeTenan' ).val(),
							CepTenan: $( ResObjPai ).find( '#CepTenan' ).val(),
							EndeTenan: $( ResObjPai ).find( '#EndeTenan' ).val(),
							NumeTenan: $( ResObjPai ).find( '#NumeTenan' ).val(),
							CidaTenan: $( ResObjPai ).find( '#CidaTenan' ).val(),
							BairroTenan: $( ResObjPai ).find( '#BairroTenan' ).val(),
							EstTenan: $( ResObjPai ).find( '#EstTenan' ).val(),
							PersoTenan: $( ResObjPai ).find( '#PersoTenan' ).val(),
							RespTenan: $( ResObjPai ).find( '#RespTenan' ).val(),
						}},
						'../../Comum/Tenant/SetSalvTenan/', function( vRespAjax ){
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
	static SetDeleTenan( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.SetAjax({
			evento:{
				IdenTenan: Core.Tenant.GetDataTableTenan( '#TableTenan', vLinha, 'tenant_cada_iden' ),
			}},
			'../../Comum/Tenant/SetDeleTenan/', function( vRespAjax ){
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
	static GetCnpjTenan( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'FormTenan' ], function( ResObjPai ){
			if ( ( $( ResObjPai ).find( '#DocTenan' ).val() != '' ) && ( $( ResObjPai ).find( '#DocTenan ').hasClass( 'is-invalid' ) == false ) ) {
				Core.ChkValDoc( $( ResObjPai ).find( '#DocTenan' ).val().replace(/[^\d]+/g,''), function( ResChkValDoc ){
					$( ResObjPai ).find( '#NomeTenan' ).val( ResChkValDoc.registros.nome );
					$( ResObjPai ).find( '#CepTenan' ).val( ResChkValDoc.registros.cep );
					$( ResObjPai ).find( '#EndeTenan' ).val( ResChkValDoc.registros.logradouro );
					$( ResObjPai ).find( '#NumeTenan' ).val( ResChkValDoc.registros.numero );
					$( ResObjPai ).find( '#CidaTenan' ).val( ResChkValDoc.registros.municipio );
					$( ResObjPai ).find( '#BairroTenan' ).val( ResChkValDoc.registros.bairro );
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
	static GetCepTenan( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'FormTenan' ], function( ResObjPai ){
			if ( ( $( ResObjPai ).find( '#CepTenan' ).val() != '' ) && ( $( ResObjPai ).find( '#CepTenan ').hasClass( 'is-invalid' ) == false ) ) {
				Core.GetCepEnde( $( ResObjPai ).find( '#CepTenan' ).val().replace(/[^\d]+/g,''), function( ResCep ){
					$( ResObjPai ).find( '#EndeTenan' ).val( ResCep.registros.logradouro );
					$( ResObjPai ).find( '#CidaTenan' ).val( ResCep.registros.localidade );
					$( ResObjPai ).find( '#BairroTenan' ).val( ResCep.registros.bairro );
					$( ResObjPai ).find( '#EstTenan' ).val( ResCep.registros.uf );
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