console.log("funcionando...")
var dataTag =  document.querySelectorAll("[data-tag]")

var url = 'https://ww2.movistar.cl/empresas/productos-y-servicios/telefonia-movil/renueva-tu-equipo/?dataTag=true&name=banner-home&description=banner-header&index=1&path=url&type=promotion'

var tagItems = dataTag
var dataUrl





  readUrlTag()
 




console.log(tagItems)


var product = {"name":"prueba","description":"prueba description","type":"product"}

var productDimension = "dimension70"
    priceDimension = "dimension71"
    payFormDimension = "dimension72"
    markDimension = "dimension73"


// function setDimension(data){
//       var nameTag = `"${nameDimension}":"${data.producto || data.promocion}"`
//       var priceTag = `"${priceDimension}":"${data.precio}"`
//       var idTag = `"${idDimension}":"${data.marca}"`
//       var typeTag = `"${typeDimension}":"${data.forma_pago}"`
//       var tagDimension = `${nameTag},${priceTag},${idTag},${typeTag}`// {{"dimension70":"nombre","dimension71":"precio","dimension72":"id","dimension73":"tipo"}}
//       return tagDimension
// }

console.log(tagItems)
function productImpresion(product, index, mode) {
  var productData = {
    event: "productImpresion",
    details: product,
    path: window.location.pathname,
    position: index,
  }
  if (mode === "dataLayer") {
    dataLayer.push(productData)
  } else if (mode === "GA") {
    // var customDimension =   setDimension(product)
    // console.log("send", "event","tagLibrary 2.0",productData.event, product.name ,eventValue, customDimension)
    console.log("enviando a ga")
  }
  return productData
}
function promotionView(promotion, index, mode) {
  var promotionData = {
    event: "promotionView",
    details: promotion,
    path: window.location.pathname,
    position: index,
  }

  setDimension(promotion)

  if (mode === "dataLayer") {
    dataLayer.push(promotionData)
  } else if (mode === "GA") {
    console.log("send", "event","tagLibrary 2.0","promotion",promotionData.event ,tagDimension)
    console.log("enviando a ga")
  }
  return promotionData
}

// funciones para pushear eventos click al dataLayer
function promotionClick(promotion, index, mode) {
  promotionData = {
    event: "promotionClick",
    details: promotion,
    path: window.location.pathname,
    position: index,
  }

  // setDimension(promotion)
  if (mode === "dataLayer") {
    dataLayer.push(promotionData)
  } else if (mode === "GA") {
    
    console.log("send", "event","tagLibrary 2.0",promotionData.event ,{'dimension1': promotion.name, 'dimension2': promotion.description, 'dimension3': promotion.type, 'dimension4': promotion.path, 'dimension5': promotion.index})
  }
  return promotionData
}
function productClick(product, index, mode) {
  productData = {
    event: "productClick",
    details: product,
    path: window.location.pathname,
    position: index,
  }
  if (mode === "dataLayer") {
    dataLayer.push(productData)
  } else if (mode === "GA") {
    ga("send", "productclick", product)
  }
  return productData
}

function tagInteraction(tag, mode) {
  var interactionData = {
    event: "interaction",
    detail: {
      tag: tag,
      path: window.location.pathname,
    },
  }
  if (mode === "dataLayer") {
    dataLayer.push(tagData)
  } else if (mode === "GA") {
    ga("send", "event","tagLibrary 2.0",productData.event,product)
  }
  return interactionData
}
//funcion para guardar datos en el sessionStorage
function saveSessionStorage(key, data) {
  var sessionData = sessionStorage.getItem(key)

  if (sessionData === null) {
    sessionStorage.setItem(key, JSON.stringify([data]))
  } else {
    // pushear objetos en un array
    var valuesTag
    valuesTag = JSON.parse(sessionStorage.getItem(key))
    valuesTag.push(data)
    sessionStorage.setItem(key, JSON.stringify(valuesTag))
  }
}

// fn para enviar informacion del SessionStorage al dataLayer
// function sendSessionStorage(mode) {
//   var productSession = sessionStorage.getItem("product")
//   var promotionSession = sessionStorage.getItem("promotion")
//   var formSession = sessionStorage.getItem("form")
//   var tagSession = sessionStorage.getItem("tag")
//   var sessionData = {
//     event: "sendSessionStorage",
//     detail: {
//       product: toString(productSession), // [{"event":"productClick","details":{"name":"solicitar oferta","description":"click botón","producto":"Moto G30","precio":"18797","marca":"Motorola","forma_pago":"boleta","type":"product"},"path":"/empresas/productos-y-servicios/telefonia-movil/renueva-tu-equipo/","position":5}]
//       promotion: promotionSession, //[{"event":"productClick","details":{"name":"solicitar oferta","description":"click botón","producto":"Moto G30","precio":"18797","marca":"Motorola","forma_pago":"boleta","type":"product"},"path":"/empresas/productos-y-servicios/telefonia-movil/renueva-tu-equipo/","position":5}]
//       form: formSession, // [{"event":"productClick","details":{"name":"solicitar oferta","description":"click botón","producto":"Moto G30","precio":"18797","marca":"Motorola","forma_pago":"boleta","type":"product"},"path":"/empresas/productos-y-servicios/telefonia-movil/renueva-tu-equipo/","position":5}]
//       interaction: interactionSession, //[{"event":"productClick","details":{"name":"solicitar oferta","description":"click botón","producto":"Moto G30","precio":"18797","marca":"Motorola","forma_pago":"boleta","type":"product"},"path":"/empresas/productos-y-servicios/telefonia-movil/renueva-tu-equipo/","position":5}]
//       path: window.location.pathname, // [{"event":"productClick","details":{"name":"solicitar oferta","description":"click botón","producto":"Moto G30","precio":"18797","marca":"Motorola","forma_pago":"boleta","type":"product"},"path":"/empresas/productos-y-servicios/telefonia-movil/renueva-tu-equipo/","position":5}]
//     },
//   }
//   if (mode === "dataLayer") {
//     dataLayer.push(sessionData)
//   } else if (mode === "GA") {
//     ga("send", "event","tagLibrary 2.0","sessionData",{'dimensionProducto': '[{"event":"productClick","details":{"name":"solicitar oferta","description":"click botón","producto":"Moto G30","precio":"18797","marca":"Motorola","forma_pago":"boleta","type":"product"},"path":"/empresas/productos-y-servicios/telefonia-movil/renueva-tu-equipo/","position":5}]'} )
//   }
// }

function formSend(product, mode) {
  formData = {
    event: "formSend",
    detail: {
      product: product,
      path: window.location.pathname,
    },
  }

  if (mode === "dataLayer") {
    dataLayer.push(formData)
  } else if (mode === "GA") {
    ga("send", "event","tagLibrary 2.0","" )
  }
  return formData
}

// ------ flujo 1: Marcage View ------
var sendMode = "GA"
// Push de los Views
tagItems.forEach(function (e, i) {
  var data = JSON.parse(e.dataset.tag)
  var type = data.type
  var mode = data.mode || sendMode
  console.log(data)
  if (type === "product") {
    productImpresion(data, i, mode)
  } else if (type === "promotion") {
    promotionView(data, i, mode)
  }
})

console.log(dataTag)
function readUrlTag() {
  var urlSearchParams = new URLSearchParams(window.location.search);
  urlSession =url;
  console.log(url)
  var eventTagLibrary = urlSearchParams.get('dataTag');
  if (eventTagLibrary) {
    var name = urlSearchParams.get('name');
    var description = urlSearchParams.get('description');
    var index = urlSearchParams.get('index');
    var path = urlSearchParams.get('path');
    var type = urlSearchParams.get('type');
    dataUrl= {
      name: name,
      description: description,
      index: index,
      path: path,
      type: type
    }
    console.log(dataUrl)
    promotionClick(dataUrl, dataUrl.index, 'GA')
    promotionView(dataUrl, dataUrl.index, 'GA')
    
    return dataUrl
  }
}

// ------ flujo 2: Marcage Click ------
// tagItems.forEach(function (e, i) {
//   e.addEventListener("click", function (e) {
//     var data = JSON.parse(e.target.dataset.tag)
//     var type = data.type
//     var mode = data.mode || sendMode
//     if (type === "product") {
//       productClick(data, i, mode)

//       saveSessionStorage("product", productData)
//     } else if (type === "promotion") {
//       promotionClick(data, i, mode)
//       saveSessionStorage(type, promotionData)
//     }
//   })
// })


//------ flujo 3: Formulario ------
// tagItems.forEach(function (e) {
//   e.addEventListener("click", function (e) {
//     var data = JSON.parse(e.target.dataset.tag)
//     var type = data.type
//     var mode = data.mode || sendMode
//     if (type === "submit") {
//       e.preventDefault()
//       var product = sessionStorage.getItem("product")
//       formSend(product, mode)
//       saveSessionStorage("form", formData)
//       sendSessionStorage()
//       setTimeout(function () {
//         sessionStorage.clear()
//       }, 2000)
//     }
//   })
// })
// flujo 4 : datos de url





//------ flujo 5: Interacciones ------
// tagItems.forEach(function (e) {
//   e.addEventListener("click", function (e) {
//     var data = JSON.parse(e.target.dataset.tag)
//     var type = data.type
//     var mode = data.mode || sendMode
//     if (type === "interaction") {
//       tagInteraction(data, mode)
//       saveSessionStorage("interaction", interactionData)
//     }
//   })
// })

setTimeout(function () {
  sendSessionStorage(sendMode)
}, 2000)