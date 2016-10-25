var clients = new Bloodhound({
    datumTokenizer: function (datum) {
        return Bloodhound.tokenizers.whitespace(datum.value);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
        url: 'https://teste.com.br/getClientes?search=%QUERY',
        wildcard: '%QUERY',
        filter: function (clients) {
            return jQuery.map(clients, function (client) {
                return {
                    value: client.cli_nome,
                    id: client.cli_codigo
                };
            });
        }
    }

});

clients.initialize();

jQuery('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1,
        display: 'id',
    }, {
    displayKey: 'value',
    source: clients.ttAdapter()
}).on('typeahead:selected', function (obj, datum) {
    console.log(datum.id);
});