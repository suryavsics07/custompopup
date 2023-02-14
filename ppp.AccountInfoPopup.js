/*
	InfoCard Popup for custom popup need
Note - In order to use the InfoCard  library following html, scripts and styles needs to be included -
	
		
	scrpts:
	-------
		for ajax and click events use jquery library
		common/ppp_js_tools/library/jquery/jquery-1.11.1.js
		modules/SAL_Common/js/ppp.AccountInfoPopup.js
	

	styles:
	-------
		modules/SAL_Common/css/popup.css

The InfoCard popup library provides the following function to generate the filters on the page:
    @params 
    overlayId @string, loaderId @string , ajaxUrl @string, style, panel @object
	PPP.InfoCardPopup.createpopup = function (_Params) {


	}


// Note: tabIndexName and InfoData index should be same, data index is name of tab in lowecase with undescore inplace of space 


// to show popup 
PPP.InfoCardPopup.showPopup();

Note - The Account Popup is divided in 3 sections:
	1. Left Section - This is used to set popup background only.
	2. Right Section - This contains all tabs data.
	3. Header Section - This comprises of popup heading.

	//Example

    var popupConfig = {
        overlayId: 'divInfoCardModel_bg', // or null
        loaderId: 'divLoading',
        ajaxUrl: { // or null
            url: 'http://localhost/kmk/getdata.json',
            sData: {Account_id:2 }
        },
        style:{
            "width":'750px',
            "padding":'10px',
        },
        header:"Popup Header",
        panel:{
            "leftpanel":{
                "isDisplay":true,
                "style":{
                    "width":'150px',
                    "padding-right":'10px',
                    "background":"rgb(185 208 246)"
                },
                "attr":{
                    "id":"leftpanel",
                    "class":"accountInfoLeftPanel"
                },
                "html": "<div class='leftPanelMainLogo'><img src='bg.png' style=' max-width: 100%;  height: 100%;'></div>"
            },
            "rightpanel":{
                "style":{
                    "width":'580px',
                    "padding-left":'35px',
                },
                "attr":{
                    "id":"rightpanel",
                    "class":""
                },
                "html": '<div class="title" id="divInfoCardModel_title" style="font-size: 24px; line-height: 32px;">PP Globals</div><div class="accountType" id="divInfoCardModel_accountType"><div class="locationIcon"></div><span>ASUETG673 | VENDER | PP Globals, 4rth floor, Bandra Mumbai India</span></div><div class="idn-info"><div class="idnIcon"></div><span id="divInfoCardModel_idn">IDN : yu776g</span></div>'
            }
        }
        
}
PPP.InfoCardPopup.createpopup(popupConfig );
	
*/
if (!PPP) {
    var PPP = {};
}

if (!PPP.InfoCardPopup) {
    /*
    Initialize Account Popup library config parameter
    */
    PPP.InfoCardPopup = {
        version: 1,
        config: null,
    };

    /* Create and initialize popup structure*/
    PPP.InfoCardPopup.createpopup = function(_Params) {

        if (!_Params ||
            typeof _Params.loaderId === "undefined" ||
            typeof _Params.panel === "undefined" ||
            typeof _Params.panel.rightpanel === "undefined" ) {
            console.error('Popup LoaderId, rightpanel or tabs are undefined.');
            return false;
        } else
            PPP.InfoCardPopup.config = _Params;

        var oDiv = document.createElement("DIV");
        oDiv.classList.add('popupContent');

        if (PPP.InfoCardPopup.config.panel.leftpanel != undefined && PPP.InfoCardPopup.config.panel.leftpanel.isDisplay == true) {

            var oDivLeft = document.createElement("DIV");
            for (attribute in PPP.InfoCardPopup.config.panel.leftpanel.attr) {

                oDivLeft.setAttribute(attribute, PPP.InfoCardPopup.config.panel.leftpanel.attr[attribute]);
            }
            oDivLeft.classList.add('leftpanel'); // default class for leftpanel
            //setAttribute
            for (property in PPP.InfoCardPopup.config.panel.leftpanel.style) {

                oDivLeft.style.setProperty(property, PPP.InfoCardPopup.config.panel.leftpanel.style[property]);
            }

            oDiv.appendChild(oDivLeft);
            if (PPP.InfoCardPopup.config.panel.leftpanel.html != undefined && PPP.InfoCardPopup.config.panel.leftpanel.html.length > 1) {
                oDivLeft.innerHTML = PPP.InfoCardPopup.config.panel.leftpanel.html;
            }

        }

        var oDivRight = document.createElement("DIV");

        if (PPP.InfoCardPopup.config.panel.rightpanel.attr != undefined && Object.keys(PPP.InfoCardPopup.config.panel.rightpanel.attr).length > 0) {
            for (attribute in PPP.InfoCardPopup.config.panel.rightpanel.attr) {

                oDivRight.setAttribute(attribute, PPP.InfoCardPopup.config.panel.rightpanel.attr[attribute]);
            }
        }
        oDivRight.classList.add('rightpanel'); // default class for rightpanel
        if (PPP.InfoCardPopup.config.panel.rightpanel.style != undefined && Object.keys(PPP.InfoCardPopup.config.panel.rightpanel.style).length > 0) {
            for (property in PPP.InfoCardPopup.config.panel.rightpanel.style) {

                oDivRight.style.setProperty(property, PPP.InfoCardPopup.config.panel.rightpanel.style[property]);
            }
        }
        

        oDiv.appendChild(oDivRight);


        // set style of popup container 
        PPP.InfoCardPopup.container = document.createElement("DIV");
        PPP.InfoCardPopup.container.setAttribute('Id', 'divInfoCardModel');
        PPP.InfoCardPopup.container.classList.add('divInfoCardModel');

        for (property in PPP.InfoCardPopup.config.style) {
            PPP.InfoCardPopup.container.style.setProperty(property, PPP.InfoCardPopup.config.style[property]);
        }

        if (PPP.InfoCardPopup.config.header != undefined && PPP.InfoCardPopup.config.header.length > 1) {
            // popup header
            var oDivRight_1 = document.createElement("DIV");

            oDivRight_1.classList.add('InfoCardModelHeader');
            oDivRight_1.setAttribute("ID", "divInfoCardModelHeader");
            
            oDivRight_1.innerHTML = PPP.InfoCardPopup.config.header;
            
            // header end

            PPP.InfoCardPopup.container.appendChild(oDivRight_1);
        }
        // popup close button
        var btnClose = document.createElement("span");
        btnClose.innerHTML = "×";
        btnClose.setAttribute("ID", "spanInfoCardX");

        $(btnClose).on("click", function() {
            PPP.InfoCardPopup.closePopup();
        });

        PPP.InfoCardPopup.container.appendChild(btnClose);
        PPP.InfoCardPopup.container.appendChild(oDiv);

        if (PPP.InfoCardPopup.config.overlayId != undefined && PPP.InfoCardPopup.config.overlayId != "null" && document.getElementById(PPP.InfoCardPopup.config.overlayId)) {

            var oDivoverlay = document.getElementById(PPP.InfoCardPopup.config.overlayId);

        } else {
            /* create popup overlay*/
            var oDivoverlay = document.createElement("DIV");
            oDivoverlay.setAttribute('id', 'divInfoCardModel_bg');
        }

        oDivoverlay.classList.add('InfoCardModel_bg');
        PPP.InfoCardPopup.overlay = oDivoverlay;
        var body = document.getElementsByTagName("body");
        body[0].appendChild(oDivoverlay);
        body[0].appendChild(PPP.InfoCardPopup.container);


        /* close popup on overlay background click */
        $(oDivoverlay).click(function() {

            PPP.InfoCardPopup.closePopup();
        });

        if (PPP.InfoCardPopup.config.ajaxUrl != undefined && PPP.InfoCardPopup.config.ajaxUrl.url != undefined) {
            PPP.InfoCardPopup.updateData( oDivRight);

        }else if (PPP.InfoCardPopup.config.panel.rightpanel.html != undefined && PPP.InfoCardPopup.config.panel.rightpanel.html.length > 1) {
            oDivRight.innerHTML = PPP.InfoCardPopup.config.panel.rightpanel.html;
        }

    }

    /* function to show loader*/
    PPP.InfoCardPopup.showLoader = function() {
        document.getElementById(PPP.InfoCardPopup.config.loaderId).style.display = 'block';
    }
    /* function to show loader*/
    PPP.InfoCardPopup.closeLoader = function() {
        document.getElementById(PPP.InfoCardPopup.config.loaderId).style.display = 'none';
    }

    /* function to clear account Data */
    PPP.InfoCardPopup.clearData = function() {
        PPP.InfoCardPopup.InfoData = [];
    }


    /* Set popup position on screen*/
    PPP.InfoCardPopup.setposition = function(positionCallback) {
        var _position = positionCallback();
        PPP.InfoCardPopup.container.style.top = _position.top;
        PPP.InfoCardPopup.container.style.left = _position.left;
    }

    // this function to display popup
    PPP.InfoCardPopup.showPopup = function() {

        PPP.InfoCardPopup.overlay.style.display = 'block';
        PPP.InfoCardPopup.container.style.display = 'block';
    }

    // this function to close the popup
    PPP.InfoCardPopup.closePopup = function() {

        //destroying chart object from memory
        if(PPP.InfoCardPopup.chart){

            PPP.InfoCardPopup.chart.destroy();
            delete PPP.InfoCardPopup.chart;
        }

        PPP.InfoCardPopup.container.parentNode.removeChild(PPP.InfoCardPopup.container);
        PPP.InfoCardPopup.overlay.parentNode.removeChild(PPP.InfoCardPopup.overlay);
    }


    // set popup height
    PPP.InfoCardPopup.setPopupHeight = function() {
        var rightpanel_height = $(".rightpanel").height();
        if (rightpanel_height > 360) {
            PPP.InfoCardPopup.container.style.height = rightpanel_height + 'px';
        } else {
            PPP.InfoCardPopup.container.style.height = '360px';
        }
    }

    PPP.InfoCardPopup.setHtml = function(_targetElementId, dataHtml) {
        var _targetElement = document.getElementById(_targetElementId);
        _targetElement.innerHTML = dataHtml;
    }

    PPP.InfoCardPopup.getSlug = function(_name) {
        return _name.toLowerCase().replace(/ /g, '_').replace(/[^\w-]+/g, '');
    }



    PPP.InfoCardPopup.updateData = function(oDivRight) {
        if (PPP.InfoCardPopup.config == undefined) {
            console.error('Popup config not exist.');
            return false;
        }
        if (PPP.InfoCardPopup.config.ajaxUrl.sData == undefined || PPP.InfoCardPopup.config.ajaxUrl.sData == 'null') {
            console.error('For ajax call data is missing.');
            return false;
        }
        
            $.ajax({
                url: PPP.InfoCardPopup.config.ajaxUrl.url,
                data: PPP.InfoCardPopup.config.ajaxUrl.sData,
                type: 'post',
                dataType: 'json',
                beforeSend: function() {
                    PPP.InfoCardPopup.showLoader();
                    PPP.InfoCardPopup.clearData();
                },
                success: function(response) {
                    if (response.success) {

                        if (response.data != undefined && response.data != null) {
                            oDivRight.innerHTML = response.data;
                            if (PPP.InfoCardPopup.config.PopupPositionCallback != undefined && PPP.InfoCardPopup.config.PopupPositionCallback != null) {
                                PPP.InfoCardPopup.setposition(PPP.InfoCardPopup.config.PopupPositionCallback);
                            }
                            
                            PPP.InfoCardPopup.setPopupHeight();

                        } else {
                            console.error("Data not found");
                        }
                    } else {
                        console.error("No account data found", "Failure", 320);
                        PPP.InfoCardPopup.closePopup();
                    }
                },
                error: function(err) {
                    console.error(err, "Failure", 320);
                    PPP.InfoCardPopup.closePopup();
                    PPP.InfoCardPopup.closeLoader();
                },
                complete: function() {
                    PPP.InfoCardPopup.closeLoader();
                }
            });

        

    }

  
}