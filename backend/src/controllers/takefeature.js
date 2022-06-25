function takelen(dic) {
    var S = 0;
    for (var k in dic) {
        S += dic[k].length
    }
    return S
}

const processreq = (req) => {
    var item = {
        "Method": req.method,
        "URI": req.baseUrl,
        "Host_Header": "HTTP/" + req.httpVersion,
        "Connection": req.headers.connection,
        "Accept": req.headers.accept,
        "Accept_language": req.headers["accept-language"],
        "User_Agent": req.headers["user-agent"],
        "POST_Data": "?",
        "GET_Query": req.url.slice(2, req.url.length)
    };
    var Len_of_rq = takelen(item)
    var Len_of_argu = item["POST_Data"].length + item["GET_Query"].length
    var Num_of_argu = 0
    if (item["POST_Data"] == "?" && item["GET_Query"] == "?") {
        Num_of_argu = 0;
    } else if (item["POST_Data"] == "?") {
        Num_of_argu = item["GET_Query"].split("&").length
    } else if (item["GET_Query"] == "?") {
        Num_of_argu = item["POST_Data"].split("&").length
    } else {
        Num_of_argu = 0;
    }

    var path = item["URI"] + "?" + item["GET_Query"] + item["POST_Data"]
    var Len_of_path = path.length

    var querypoint = item["URI"].length
    var Num_of_digit_in_argu = 0,
        Num_of_let_in_argu = 0,
        Num_of_let_char_in_path = 0,
        Num_of_spea_char_in_path = 0;

    for (var i = 0; i < querypoint; i++) {
        code = path.charCodeAt(i)
        if ((code > 64 && code < 91) || (code > 96 && code < 123)) {
            Num_of_let_char_in_path += 1;
        }
    }
    for (var i = querypoint + 1; i < path.length; i++) {
        if (path[i] == '%') {
            i += 2
            Num_of_spea_char_in_path += 1
        } else {
            code = path.charCodeAt(i)
            if ((code > 64 && code < 91) || (code > 96 && code < 123)) {
                Num_of_let_in_argu += 1;
                Num_of_let_char_in_path += 1;
            }
            var temp = parseInt(path[i], 10)
            if (temp != NaN) {
                Num_of_digit_in_argu += 1;
            }
        }
    }
    var result = {
        "Len_of_rq": Len_of_rq,
        "Len_of_argu": Len_of_argu,
        "Num_of_argu": Num_of_argu,
        "Len_of_path": Len_of_path,
        "Num_of_digit_in_argu": Num_of_digit_in_argu,
        "Num_of_let_in_argu": Num_of_let_in_argu,
        "Num_of_let_char_in_path": Num_of_let_in_argu,
        "Num_of_spea_char_in_path": Num_of_spea_char_in_path
    }
    return result
}

module.exports = {
    processreq
}