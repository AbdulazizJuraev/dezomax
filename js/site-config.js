/* ============================================================
   DezoMax — bosh sahifa sozlamalari (admin → «Sayt» bo'limi yozadi)
   null — standart holat (js/app.js dagi DEFAULT_ROWS va featured kinolar)
   ============================================================ */

const SITE_CONFIG = /*CONFIG*/{
  "hero": {
    "ids": [
      3354,
      32,
      126,
      33,
      47,
      46,
      3347,
      2984,
      1001388653,
      2029,
      151,
      2047,
      2040,
      2037,
      136,
      138,
      58,
      55
    ],
    "kidsIds": [
      5062,
      2079,
      2382,
      2146,
      18,
      2045,
      5064,
      5063
    ],
    "delay": 5
  },
  "rows": [
    {
      "source": "popular",
      "visible": true
    },
    {
      "source": "trending",
      "visible": true
    },
    {
      "source": "konsert",
      "visible": true
    },
    {
      "source": "new",
      "visible": true
    },
    {
      "source": "uzbek",
      "visible": true
    },
    {
      "source": "cartoons",
      "visible": true
    },
    {
      "source": "dorama",
      "visible": true
    },
    {
      "source": "anime",
      "visible": true
    },
    {
      "source": "hind",
      "visible": true
    },
    {
      "source": "marvel",
      "visible": true
    },
    {
      "source": "dc",
      "visible": true
    },
    {
      "source": "top",
      "visible": true
    },
    {
      "source": "series",
      "visible": false
    }
  ],
  "logo": {
    "enabled": true,
    "pos": "br",
    "size": 14,
    "bg": "black",
    "opacity": 100,
    "mode": "always",
    "scope": "all",
    "types": [
      "film",
      "serial",
      "multfilm"
    ],
    "ids": []
  },
  "posters": {
    "2530": "https://image.tmdb.org/t/p/w342/oxJRoWlfAkC3n5o3Wdp75oSgbc6.jpg",
    "2675": "https://image.tmdb.org/t/p/w342/q14oRmj0ITMBzqHUdiGwXUIvg7t.jpg",
    "7001328": "https://image.tmdb.org/t/p/w342/oA1XlT4haoeug2YLzUccM8myBlR.jpg",
    "7020980": "https://image.tmdb.org/t/p/w342/1GPXjQNumrQp5TSfdWxGvIhxYL9.jpg",
    "7028263": "https://image.tmdb.org/t/p/w342/hWuPx5XHF8vnNWIW9hdq3CuRPAb.jpg",
    "7044808": "https://image.tmdb.org/t/p/w342/vOyM4rebbIan7wANnFyCKr460mS.jpg",
    "7049097": "https://image.tmdb.org/t/p/w342/gPdzdeehaoaYqxH2rA6yayEDSsS.jpg",
    "7062034": "https://image.tmdb.org/t/p/w342/ebqttF1Vjgde6uSFBEw9mta7Hd3.jpg",
    "7065414": "https://image.tmdb.org/t/p/w342/2qGRXNrhyg3N5KNAZuahmUvf15s.jpg",
    "7070901": "https://image.tmdb.org/t/p/w342/wXDFtcnYtevleGzCmAD2ReQnJ4l.jpg",
    "7088259": "https://image.tmdb.org/t/p/w342/v9xESDLVKXw9CqzbzA7MNWs1ROT.jpg",
    "7090324": "https://image.tmdb.org/t/p/w342/9RKPB9IKDHaTxWQgjkS4IJao08a.jpg",
    "7096166": "https://image.tmdb.org/t/p/w342/ft3eKr1ah85out6t6nAsZ1EAdUM.jpg",
    "7105528": "https://image.tmdb.org/t/p/w342/WGyAyBPncfuu8MZhLY9RtfZPM0.jpg",
    "7120852": "https://image.tmdb.org/t/p/w342/4WgJ5Dk0JhPdCdJkwHNVyJyQYdH.jpg",
    "7128057": "https://image.tmdb.org/t/p/w342/qxUPu92DF5Bo6jcCDhnMTHFPEEc.jpg",
    "7128232": "https://image.tmdb.org/t/p/w342/8o6lkhL32xQJeB52IIG1us5BVey.jpg",
    "7136503": "https://image.tmdb.org/t/p/w342/4SEMArOiQxUTXYqoSvCxEXreOi8.jpg",
    "7142075": "https://image.tmdb.org/t/p/w342/DQU4vUTMoAlUGJIC5hNfHPVELz.jpg",
    "7147662": "https://image.tmdb.org/t/p/w342/yMRaTOyZIePNfOeziJAN4ngutR9.jpg",
    "7163200": "https://image.tmdb.org/t/p/w342/fGYX0LCsL4hcirSChhHAevT09nT.jpg",
    "7163869": "https://image.tmdb.org/t/p/w342/8WriKzjD9mx2CSuhUVhu1GW9yy6.jpg",
    "7166972": "https://image.tmdb.org/t/p/w342/sDTumQBxhIyYbZ9acsTtoLfb5ZG.jpg",
    "7185259": "https://image.tmdb.org/t/p/w342/xS9ROhWuDRVISGArruDFYnj0cik.jpg",
    "7186851": "https://image.tmdb.org/t/p/w342/f1v8IcYcQggeq1N0unoMJMrzTd9.jpg",
    "7192656": "https://image.tmdb.org/t/p/w342/7L6rceYgzQ0NeHD7PRDNrRoQ291.jpg",
    "7205788": "https://image.tmdb.org/t/p/w342/7RK9GHFArnQusZERwYwIaMZwRll.jpg",
    "7218976": "https://image.tmdb.org/t/p/w342/3YMaZ7A8wKs0gngDdexs0pLkAnR.jpg",
    "7221446": "https://image.tmdb.org/t/p/w342/g17M2bvbNMM8QUaUFd1uxAvdGyn.jpg",
    "7231112": "https://image.tmdb.org/t/p/w342/gt70JOD9xsPlpJnuBJAWdOT4yRg.jpg",
    "7241429": "https://image.tmdb.org/t/p/w342/nbQgIssZPp1WsX1BF1OK7rBKe98.jpg",
    "7249037": "https://image.tmdb.org/t/p/w342/jzL9WLPi4GLg4ricmVuiWYkjbTb.jpg",
    "7250991": "https://image.tmdb.org/t/p/w342/4eqr5LZH122BiU9hboXHZxX8bBl.jpg",
    "7273625": "https://image.tmdb.org/t/p/w342/oYILqFav3Yq0lmGw5538bVReQRH.jpg",
    "7282838": "https://image.tmdb.org/t/p/w342/oCf5O6uxooTvRwKVnLHwGqZUifq.jpg",
    "7293611": "https://image.tmdb.org/t/p/w342/hiLwtS68fCx9rd5GFK0QDqu4uBV.jpg",
    "7294572": "https://image.tmdb.org/t/p/w342/rmwQ8GsdQ1M3LtemNWLErle2nBU.jpg",
    "7299918": "https://image.tmdb.org/t/p/w342/xCDqSY3cxVQbZULUgpoqRMNLvFQ.jpg",
    "7300682": "https://image.tmdb.org/t/p/w342/j9jz5wZlQoq65YuYPNauB72uvFJ.jpg",
    "7307190": "https://image.tmdb.org/t/p/w342/g0mWNUELRT1Oa2Phqt0YrqJeXX1.jpg",
    "7313670": "https://image.tmdb.org/t/p/w342/jNsttCWZyPtW66MjhUozBzVsRb7.jpg",
    "7327829": "https://image.tmdb.org/t/p/w342/zXrxCpD6UR96mk3umb93ub3RmSs.jpg",
    "7334288": "https://image.tmdb.org/t/p/w342/ro63lGzoTZEUPyvqvK6p4zsHcNA.jpg",
    "7341343": "https://image.tmdb.org/t/p/w342/82Vh8PSzWtBi0CLWrnJdRhGYxEr.jpg",
    "7341593": "https://image.tmdb.org/t/p/w342/YFcQ65dRrLpUpMiMFrrRV6rkEs.jpg",
    "7345943": "https://image.tmdb.org/t/p/w342/20n5IWvVH1g8cfgiqJMbT2nKF4L.jpg",
    "7348924": "https://image.tmdb.org/t/p/w342/1qnh1n1tVRq7JY8MYbvaZgfRfq2.jpg",
    "7365227": "https://image.tmdb.org/t/p/w342/4tTrW9dXCByS5wt2pXVWb58zNjz.jpg",
    "7372319": "https://image.tmdb.org/t/p/w342/HmYyW0kKMoLE3WwA4kIHibD5OR.jpg",
    "7390829": "https://image.tmdb.org/t/p/w342/xpVP0oajb0NQpzCA1EmP8cKXx3I.jpg",
    "7406795": "https://image.tmdb.org/t/p/w342/w5rqOMj4J85Dee1tA3qNwhPuxKt.jpg",
    "7415620": "https://image.tmdb.org/t/p/w342/f8jEtVvkeBOIQViEQZiPcnGHLnl.jpg",
    "7421648": "https://image.tmdb.org/t/p/w342/68jNkFi61MQjrJEqj2up5wZ4w5R.jpg",
    "7424333": "https://image.tmdb.org/t/p/w342/1QgOjoYLproxIWRZxhZx9pXsmuY.jpg",
    "7450016": "https://image.tmdb.org/t/p/w342/biovC0fjDUUSGJiR4joGaGERUS3.jpg",
    "7465490": "https://image.tmdb.org/t/p/w342/svrAzMTif4OmIjGJzC0W92d5O1o.jpg",
    "7467064": "https://image.tmdb.org/t/p/w342/bC2Mix1WPUiY6pldh77oiFl1MvI.jpg",
    "7469288": "https://image.tmdb.org/t/p/w342/AsPFMI3PhgCsraMq7RmMJwFQh2b.jpg",
    "7481634": "https://image.tmdb.org/t/p/w342/fmiM9gHqvvPHr9oGoXdZ5aIODUY.jpg",
    "7487674": "https://image.tmdb.org/t/p/w342/pKfLcnMuIJ9APwupQuMhKSTCgkR.jpg",
    "7491506": "https://image.tmdb.org/t/p/w342/nJ6fFUwfS3XP64DNTZpIQ02ilpM.jpg",
    "7491815": "https://image.tmdb.org/t/p/w342/8FP2ObEGIiQYQCf83gL4ZVzwZF8.jpg",
    "7517890": "https://image.tmdb.org/t/p/w342/y8NtM6q3PzntqyNRNw6wgicwRYl.jpg",
    "7522347": "https://image.tmdb.org/t/p/w342/z5LGHPbf8s5KtFqTykaOMraSPZj.jpg",
    "7542648": "https://image.tmdb.org/t/p/w342/tfgccePxnswMqhmtxafliLlcCVR.jpg",
    "7556539": "https://image.tmdb.org/t/p/w342/gcAZ5f6Y40koGYcfPUqb2tmnVd.jpg",
    "7562322": "https://image.tmdb.org/t/p/w342/f4hdIed8vh10O8TkQ1CkHS8MQ3G.jpg",
    "7566097": "https://image.tmdb.org/t/p/w342/jZkksyMZdTYw7fIVKyA95nFEPnt.jpg",
    "7568884": "https://image.tmdb.org/t/p/w342/t6LLguAmu6iZUN8pWhT7Q0IcaQ5.jpg",
    "7572250": "https://image.tmdb.org/t/p/w342/3qxopgGZ4js9rGLlRwAGAOOFddF.jpg",
    "7576978": "https://image.tmdb.org/t/p/w342/foNIl77csO9GmsvCvTZ6ixt0fZf.jpg",
    "7578789": "https://image.tmdb.org/t/p/w342/5fXrqBIvatwSuph7nTuSETBQYxm.jpg",
    "7593104": "https://image.tmdb.org/t/p/w342/ogwQOLbCfncjvBhFb5l0OmQH8KC.jpg",
    "7598931": "https://image.tmdb.org/t/p/w342/1ApfSA8JTqeha3GTFEY8syV4auq.jpg",
    "7608197": "https://image.tmdb.org/t/p/w342/81szv19zvs5fGqXtWau6tXzfC4T.jpg",
    "7635770": "https://image.tmdb.org/t/p/w342/x50ig6nAMNCP3ihDXKfUjnKM4Ud.jpg",
    "7650736": "https://image.tmdb.org/t/p/w342/tNap97mpnj63cQ5dXnCDYWKdUbi.jpg",
    "7657413": "https://image.tmdb.org/t/p/w342/yo91LPlSzskGGNo273us7ScuKIH.jpg",
    "7660523": "https://image.tmdb.org/t/p/w342/ikbG08TQtkIWUVRVotHhndf72pL.jpg",
    "7682947": "https://image.tmdb.org/t/p/w342/ccn6bFUA5DECjA3Lo0CuJqGNQCv.jpg",
    "7688197": "https://image.tmdb.org/t/p/w342/hdm3E8jF2RawTXWh0zw3lOAGQ7B.jpg",
    "7694414": "https://image.tmdb.org/t/p/w342/1agSI7NGvagr720za8XAubtqUoB.jpg",
    "7698624": "https://image.tmdb.org/t/p/w342/xqovj2p6HRsgHxN81qYAYF4StgM.jpg",
    "7716002": "https://image.tmdb.org/t/p/w342/vLl5tcuabARqGBefccSsYAYXdgA.jpg",
    "7717566": "https://image.tmdb.org/t/p/w342/r2ib7b2QRLRlb8g7K2QI2rfFgeA.jpg",
    "7721908": "https://image.tmdb.org/t/p/w342/sUBMoWqk16TO8Vj3sXsX2fial9k.jpg",
    "7733683": "https://image.tmdb.org/t/p/w342/uN0JESJgHnTZol84MMG19Vxf1Li.jpg",
    "7737387": "https://image.tmdb.org/t/p/w342/8Y4oJ5iUs3hgPcDB3SIEmsNYjZk.jpg",
    "7745075": "https://image.tmdb.org/t/p/w342/3mlyu5R8EnKst5UHPEx46meduNP.jpg",
    "7757803": "https://image.tmdb.org/t/p/w342/z4gVnxTaks3anTycwKjDmvQSuWt.jpg",
    "7760938": "https://image.tmdb.org/t/p/w342/xM23YJnhlJgf8gOFE34IZBMxUy3.jpg",
    "7772562": "https://image.tmdb.org/t/p/w342/xJnOMMsFASxNiFnG7v3TNIQ3ife.jpg",
    "7789098": "https://image.tmdb.org/t/p/w342/myd1K3gefdNAWFsGNRDdMeiK9Qg.jpg",
    "7794058": "https://image.tmdb.org/t/p/w342/n7NR7SH7CyiiF70yN96r3d1jWr0.jpg",
    "7797857": "https://image.tmdb.org/t/p/w342/eRAMlD2MqqbilyMCpr2SCbgR4HH.jpg",
    "7798203": "https://image.tmdb.org/t/p/w342/6H2N59jJW1hZEzn2ZdrMvJw5vNI.jpg",
    "7805287": "https://image.tmdb.org/t/p/w342/lV8YHwGkYZsm6EfIqnhaSz2avKt.jpg",
    "7806696": "https://image.tmdb.org/t/p/w342/o5zHDxx9aGtg0bK9gVghik8ohYb.jpg",
    "7813591": "https://image.tmdb.org/t/p/w342/seuVs7Swm0LLAlrsSI9KRti8ttX.jpg",
    "7819343": "https://image.tmdb.org/t/p/w342/s5KZqIvyjwKpTRESCVrVGkT1JX3.jpg",
    "7823088": "https://image.tmdb.org/t/p/w342/rwsWNNJKqLdN0ymCPx1yJagMVi.jpg",
    "7823938": "https://image.tmdb.org/t/p/w342/mcLpiitxA2eVA0RpaEYSRoDjSLS.jpg",
    "7831516": "https://image.tmdb.org/t/p/w342/oxaW6X3xohnzdFSBKCrCjRDckMe.jpg",
    "7837698": "https://image.tmdb.org/t/p/w342/TVvIyCsFCmLk9MRLbAZi4X8f32.jpg",
    "7843302": "https://image.tmdb.org/t/p/w342/r6SrZ2ZpTvL0SJkeofBxWmRF9bU.jpg",
    "7852392": "https://image.tmdb.org/t/p/w342/40Mxw7P1l9KwkQipHgzVNHFMfVC.jpg",
    "7878704": "https://image.tmdb.org/t/p/w342/hBxN6dwrANN1ic3a4G9x6JZcR3C.jpg",
    "7884754": "https://image.tmdb.org/t/p/w342/lCel0uHnVgCGihg4xrWSPzOMnV4.jpg",
    "7897296": "https://image.tmdb.org/t/p/w342/kC1KegfbzcnjW8fkeo702ZwxF8G.jpg",
    "7908834": "https://image.tmdb.org/t/p/w342/92Ds0hOHObvZBekqneimrGpxyXh.jpg",
    "7923986": "https://image.tmdb.org/t/p/w342/AthqHRKJFOIbLa459I3D5yHdrQL.jpg",
    "7934614": "https://image.tmdb.org/t/p/w342/4apG9Xk6HQvV48JKEjSUeiebju7.jpg",
    "7943211": "https://image.tmdb.org/t/p/w342/7HPvgItDw9NgW3iy4tFRRuGNbuN.jpg",
    "7950839": "https://image.tmdb.org/t/p/w342/dboSanhToCuyjNHYvJLCRc39Koe.jpg",
    "7951868": "https://image.tmdb.org/t/p/w342/p6fgibCKaofyaGOMHcsYdXjECir.jpg",
    "7952387": "https://image.tmdb.org/t/p/w342/5jhArZFrQIqEuh4ZNuBaQsnEy7s.jpg",
    "7962404": "https://image.tmdb.org/t/p/w342/ociUlULY2vZkenQqwTnwK4aq2Y1.jpg",
    "7976571": "https://image.tmdb.org/t/p/w342/gH6IQvbPekyyPN8rMXlaiR99Rxp.jpg"
  }
}/*ENDCONFIG*/;
