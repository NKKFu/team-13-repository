var PATH_DATA_SOURCE = "assets/json/coronabr_datasource.json",
    API_BASEPATH = "https://392ccfb0.us-south.apigw.appdomain.cloud/api/coronabr/",
    MAX_ITEMS_COLUMN = 4,
    hasQuestion = !1,
    hasEnded = !1,
    currentAnswerType = "",
    nextIndex = "",
    currentIndex = "",
    coronabrLogo, headerCompartilhar, userIdentifier = createUUID(),
    testNumber = 1,
    validation = {},
    customerAnswers = {},
    datasource;
$(document).ready(function() {
    setup();
    $(".header-compartilhar").click(function(a) {
        "0px" == $(this).css("right") ? $(this).animate({
            right: "-173px"
        }, 500) : $(this).animate({
            right: "0px"
        }, 500)
    });
    coronabrLogo = $(".logo-coronabr");
    headerCompartilhar = $(".header-compartilhar");
    adjustSharePosition()
});
$(document).on("click", ".answer", onClickButtonAnswer);
$(window).scroll(adjustSharePosition);

function adjustSharePosition() {
    var a = coronabrLogo.offset().top - $(window).scrollTop(),
        b = coronabrLogo.height();
    a = a + b / 2 - headerCompartilhar.height() / 2;
    headerCompartilhar.css("top", a + "px")
}

function onClickButtonAnswer(a) {
    var b = $(this),
        c = getCurrentIdQuestion(),
        d = [];
    "single" == currentAnswerType ? d.push(b.data("id")) : "multiple" == currentAnswerType && (d = getSelectedAnswers());
    customerAnswers[currentIndex] = {
        question: c,
        answers: d
    };
    saveInteraction({
        identifier: userIdentifier,
        id_question: c,
        test_number: testNumber,
        answers: d,
        scene: currentIndex
    });
    "button_link_external" != b.data("type") && ("button_reset" == b.data("type") && (customerAnswers = {}, testNumber += 1), a.preventDefault(), nextIndex = getNextScene(b), goToNextStep())
}

function verifyCondition(a) {
    for (var b = 0; b < a.length; b++) {
        var c = /^([\d.]+)_(.+)$/.exec(a[b]),
            d = c[1],
            e = new RegExp(c[2]);
        if (!customerAnswers.hasOwnProperty(d)) return !1;
        c = customerAnswers[d];
        var f = !1;
        (0 < c.answers.length ? c.answers : ["none"]).map(function(a) {
            e.test(a) && (f = !0)
        });
        if (!f) return !1
    }
    return !0
}

function getSelectedAnswers() {
    var a = [];
    $("#answer-area input:checked").each(function(b) {
        a.push($(this).data("id"))
    });
    return a
}

function getCurrentIdQuestion() {
    var a = $(".txt-pergunta").attr("data-id");
    a = /^q_(\d+)$/.exec(a);
    return 0 < a.length ? parseInt(a[1]) : 0
}

function getNextScene(a) {
    if ("1.6" == currentIndex || "dica1" == currentIndex && 22 == a.data("id")) return a = "2.5", checkForCorona() && checkForSeriousState() && (a = "2.2"), checkForNotCorona() && checkForSeriousState() && (a = "2.4"), checkForCorona() && checkForFairState() && (a = "2.1"), checkForNotCorona() && checkForFairState() && (a = "2.3"), a;
    if ("undefined" == typeof a.data("ref") && validation.hasOwnProperty(currentIndex)) {
        a = validation[currentIndex];
        for (var b = 0; b < a.length; b++) {
            var c = a[b];
            if (!c.hasOwnProperty("condition") && c.hasOwnProperty("ref") ||
                checkConditions(c.condition)) return c.ref
        }
        console.error("n\u00e3o entrou em nenhuma valida\u00e7\u00e3o")
    } else return a.data("ref")
}

function checkForCorona() {
    return checkConditions([
        ["1.1_1", "1.2_\\d+"],
        ["1.1_2", "1.2_8|9|26|13"]
    ])
}

function checkForNotCorona() {
    return checkConditions([
        ["1.1_1", "1.2_none"],
        ["1.1_2", "1.2_\\d+"]
    ])
}

function checkForSeriousState() {
    return checkConditions([
        ["1.1.1_4"],
        ["1.1.2_7"],
        ["1.2.1_1", "1.2.2_2"],
        ["1.5_16"],
        ["1.6_1"]
    ])
}

function checkForFairState() {
    return checkConditions([
        ["1.1.1_3", "1.1.2_6", "1.2.1_2", "1.5_17", "1.6_2"], "1.1.1_3 1.1.2_6 1.2.1_1 1.2.2_1 1.5_17 1.6_2".split(" "), ["1.2.1_1", "1.2.2_1", "1.5_17", "1.6_2"],
        ["1.1.1_3", "1.1.2_6", "1.5_17", "1.6_2"],
        ["1.2.1_2", "1.5_17", "1.6_2"]
    ])
}

function checkConditions(a) {
    for (var b = 0; b < a.length; b++)
        if (verifyCondition(a[b])) return !0;
    return !1
}

function setup() {
    readDataSource(function(a) {
        a.hasOwnProperty("start") ? (currentIndex = a.start, reloadData()) : console.error("start scene n\u00e3o definida")
    });
    getInfo(function(a) {
        checkVariable(a) && (a.identifier = userIdentifier, saveUser(a))
    })
}

function reloadData() {
    reset();
    readDataSource(function(a) {
        if (a.hasOwnProperty(currentIndex)) {
            a = a[currentIndex];
            var b = $("#video-cena");
            b.attr("src", a.video);
            b[0].play();
            a.hasOwnProperty("redirect") ? nextIndex = a.redirect : a.hasOwnProperty("interaction") ? (a.interaction.hasOwnProperty("question") && ($("#qa-area").find(".txt-pergunta").html(a.interaction.question), $("#qa-area").find(".txt-pergunta").attr("data-id", "q_" + a.id)), a.interaction.hasOwnProperty("answer") && (b = a.interaction.answer, currentAnswerType =
                a.interaction.type, "single" == a.interaction.type ? buildAnswerTypes(b) : "multiple" == a.interaction.type && (buildAnswerTypes(b.options), validation[currentIndex] = b.redirect, buildAnswerTypes([{
                    type: "button",
                    text: "CONTINUAR"
                }]))), hasInteraction = !0) : hasEnded = !0;
            displayData()
        } else console.error("index inv\u00e1lido", currentIndex)
    })
}

function buildAnswerTypes(a) {
    if (0 == a.length) return !1;
    var b = $("#answer-area");
    if (a.length > MAX_ITEMS_COLUMN) {
        var c = $("<div class='col-xs-12 col-sm-6 col-md-6'>"),
            d = $("<div class='col-xs-12 col-sm-6 col-md-6'>");
        buildAnswers(a.slice(0, Math.ceil(a.length / 2)), c);
        buildAnswers(a.slice(Math.ceil(a.length / 2), a.length), d);
        b.append(c);
        b.append(d)
    } else c = $("<div class='col-xs-12 col-sm-12 col-md-12'>"), buildAnswers(a, c), b.append(c);
    return !0
}

function buildAnswers(a, b) {
    for (var c = 0, d = a.length; c < d; c++) b.append(buildAnswer(a[c]))
}

function buildAnswer(a) {
    var b = $("<div class='col-xs-12 col-sm-12 col-md-12 no-padding'>");
    if ("button" == a.type) {
        var c = $("<a class='answer btn-escolha'>");
        c.attr("data-type", a.type);
        c.attr("href", "#");
        c.text(a.text);
        c.attr("data-ref", a.ref);
        a.hasOwnProperty("id") && c.attr("data-id", a.id);
        b.append(c)
    } else if ("button_link_external" == a.type) c = $("<a class='answer btn-escolha'>"), c.attr("data-type", a.type), c.text(a.text), c.attr("target", "_blank"), c.attr("href", a.ref), a.hasOwnProperty("id") && c.attr("data-id",
        a.id), b.append(c);
    else if ("button_reset" == a.type) c = $("<a class='answer btn-escolha'>"), c.attr("data-type", a.type), c.text(a.text), readDataSource(function(a) {
        c.attr("data-ref", a.start)
    }), b.append(c);
    else if ("check" == a.type) {
        var d = $("<div>");
        b.append(d);
        var e = $("<input type='checkbox' />");
        e.attr("data-type", a.type);
        e.attr("data-id", a.id);
        e.attr("id", "a_" + a.id);
        d.append(e);
        e = $("<label class='color-check'>");
        e.attr("for", "a_" + a.id);
        e.html("<div><i class='fa fa-check'></i></div>" + a.text);
        d.append(e)
    }
    a.hasOwnProperty("redirect") &&
        (validation[currentIndex] = a.redirect);
    return b
}

function goToNextStep() {
    hasEnded || (currentIndex = nextIndex, reloadData())
}

function reset() {
    hasInteraction = !1;
    $("#qa-area").hide();
    $("#answer-area").html("")
}

function displayData() {
    $("#qa-area").show()
}

function readDataSource(a) {
    "undefined" === typeof datasource ? $.getJSON(PATH_DATA_SOURCE, function(b) {
        datasource = b;
        a(datasource)
    }).fail(function() {
        console.error("erro ao carregar datasource")
    }) : a(datasource)
}

function getSceneDescription(a) {
    switch (a) {
        case "2.1":
            return "Suspect - Not Serious";
        case "2.2":
            return "Infected - Serious";
        case "2.3":
            return "Probably not infected - Not Serious";
        case "2.4":
            return "Probably not infected - Serious";
        case "2.5":
            return "Not Infected";
        default:
            return ""
    }
}

function sendEvent(a, b) {
    ga("send", "event", "Conversion", a, b, "eventValue", "fieldsObject")
}

function createUUID() {
    var a = (new Date).getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(b) {
        var c = (a + 16 * Math.random()) % 16 | 0;
        a = Math.floor(a / 16);
        return ("x" == b ? c : c & 3 | 8).toString(16)
    })
}

function saveInteraction(a) {
    makeRequest(API_BASEPATH + "save", JSON.stringify(a), "post")
}

function saveUser(a) {
    makeRequest(API_BASEPATH + "user", JSON.stringify(a), "post")
}

function getInfo(a) {
    makeRequest("http://www.cloudflare.com/cdn-cgi/trace", !1, "get", function(b, c) {
        c ? a(getInfoData(b)) : a(!1)
    }, !1, !1)
}

function makeRequest(a, b, c, d, e, f) {
    checkVariable(e) || (e = "json");
    checkVariable(f) || (f = "application/json");
    $.ajax({
        url: a,
        method: c,
        dataType: e,
        contentType: f,
        data: b,
        success: function(a) {
            checkVariable(d) && d(a, !0)
        },
        error: function(a) {
            checkVariable(d) && d(a, !1)
        }
    })
}

function checkVariable(a) {
    return "undefined" == typeof a || void 0 == a ? !1 : !0
}

function getInfoData(a) {
    a = a.split("\n");
    for (var b = {}, c = 0; c < a.length; c++) {
        var d = a[c],
            e = d.match(infoRegexes("ip")),
            f = d.match(infoRegexes("platform"));
        d = d.match(infoRegexes("location"));
        checkVariable(e) && 1 < e.length ? b.ip = e[1] : checkVariable(f) && 1 < f.length ? b.platform = f[1] : checkVariable(d) && 1 < d.length && (b.location = d[1])
    }
    return b
}

function infoRegexes(a) {
    return {
        ip: /^ip=([\w\d\.:]+)$/,
        platform: /^uag=([\d\w.;,:\-\)\(\s\/]+)$/,
        location: /^loc=([a-z\u00e1-\u00faA-Z\u00c1-\u00da\s-_]+)$/
    } [a]
};