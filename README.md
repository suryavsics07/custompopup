# custompopup

InfoCard Popup for custom popup need



## Instalation
In order to use the InfoCard  library following scripts and styles needs to be included -

```bash
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.3/dist/jquery.min.js"></script>
    <script src="ppp.AccountInfoPopup.js"></script>
    <link rel="stylesheet" href="popup.css">
```

### config

for ajax data loading set `ajaxUrl`

OR

for static data set `html` in `rightpanel`

required : overlayId, loaderId, rightpanel

```bash
<script>
    
            var popupConfig = {
                overlayId: 'divInfoCardModel_bg', // or null
                loaderId: 'divLoading',
                ajaxUrl: { // or null
                    url: 'getdata.json',
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
        ;
    </script>
```

### Usage
Example:
```bash
 <div id="divLoading">
        <p>Loading...</p>
    </div>
    <button onClick="PPP.InfoCardPopup.createpopup(popupConfig );">Show popup</button>
```
