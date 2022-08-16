$(function () {

    aplicarMascara('.sp_celphones1', 10, '(00) 0000-0000', '(00) 0000-0000');
    aplicarMascara('.sp_celphones', 11, '(00) 0 0000-0000', '(00) 0000-00009');

});

function aplicarMascara(classeAlvo, total, mascaraEntao, mascaraSenao) {

    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === total ? mascaraEntao : mascaraSenao;
    },
        spOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };

    $(classeAlvo).mask(SPMaskBehavior, spOptions);
}


function configurarEnvio(idFonte) {

    $("#form-send").submit(function (e) {

        var serializedForm = $(this).serializeArray();

        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'envia.php',
            data: serializedForm,
            success: function (data) {

                data = JSON.parse(data);

                if (data.error == false) {

                    var opcoesSelecionadas = [];
                    var qtds = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
                    var faixasEtarias = [];

                    $("input[name='operadora[]']:checked").each(function () { opcoesSelecionadas.push($(this).val()); });

                    if ($('input[name=00-18]').val() != "") { qtds[0] = $('input[name=00-18]').val(); }
                    if ($('input[name=19-23]').val() != "") { qtds[1] = $('input[name=19-23]').val(); }
                    if ($('input[name=24-28]').val() != "") { qtds[2] = $('input[name=24-28]').val(); }
                    if ($('input[name=29-33]').val() != "") { qtds[3] = $('input[name=29-33]').val(); }
                    if ($('input[name=34-38]').val() != "") { qtds[4] = $('input[name=34-38]').val(); }
                    if ($('input[name=39-43]').val() != "") { qtds[5] = $('input[name=39-43]').val(); }
                    if ($('input[name=44-48]').val() != "") { qtds[6] = $('input[name=44-48]').val(); }
                    if ($('input[name=49-53]').val() != "") { qtds[7] = $('input[name=49-53]').val(); }
                    if ($('input[name=54-58]').val() != "") { qtds[8] = $('input[name=54-58]').val(); }
                    if ($('input[name=59]').val() != "") { qtds[9] = $('input[name=59]').val(); }

                    for (var i = 0; i < 10; i++) {
                        faixasEtarias.push({ IdFaixaEtaria: i + 1, Qtd: qtds[i] });
                    }

                    var indicacao = {
                        Nome: $('input[name=Nome]').val(),
                        Email: $('input[name=Email]').val(),
                        FonePrincipal: $('input[name=FonePrincipal]').val(),
                        FoneCelular: $('input[name=FoneCelular]').val(),
                        FoneComercial: "",
                        Cidade: "São Paulo",
                        PlanoAnteriorNome: "",
                        PlanoAnteriorPeriodo: "",
                        PreferenciaHospitalar: "",
                        Observacao: "Planos selecionados como opção: " + opcoesSelecionadas.join(', '),
                        Idade: 0,
                        IdFonte: 16,
                        Modalidade: $("[name=meuCombo]:checked").val(),
                        FaixasEtarias: faixasEtarias
                    };

                    $.ajax({
                        url: 'https://api.paineldocorretor.com.br/indicacoes?hash=yxLGpy',
                        type: 'POST',
                        data: JSON.stringify(indicacao),
                        contentType: "application/json;charset=utf-8",
                        complete: function () {
                            window.location.href = "mensagem.html";
                        }
                    });

                } else {
                    alert(data.message);
                }
            }
        });

    });
}

