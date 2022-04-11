console.log("funcionando...");
var tagItems = document.querySelectorAll("[data-tag]");

console.log(tagItems);
function productImpresion(product, index, mode) {
  var productData = {
    event: "productImpresion",
    details: product,
    path: window.location.pathname,
    position: index,
  };
  if (mode === "dataLayer") {
    dataLayer.push(productData);
  } else if (mode === "GA") {
    ga(
      'send', 
      'event', 
      'tagLibrary 2.0', 
      productData.event, 
      productData.details.name, 
      {'dimension68': product.name, 
       'dimension69': product.description,
       'dimension70': product.type,
       'dimension71': product.producto,
       'dimension72': product.precio,
       'dimension73': product.marca,
       'dimension74': product.forma_pago}
    );
    console.log("enviando a ga");
  }
  return productData;
}

function promotionView(promotion, index, mode) {
  var promotionData = {
    event: "promotionView",
    details: promotion,
    path: window.location.pathname,
    position: index,
  };

  if (mode === "dataLayer") {
    dataLayer.push(promotionData);
  } else if (mode === "GA") {
    ga(
      'send', 
      'event', 
      'tagLibrary 2.0', 
      promotionData.event, 
      promotionData.details.name, 
      {'dimension68': product.name, 
       'dimension69': product.description,
       'dimension70': product.type,
       'dimension71': product.promotion,
       'dimension72': product.precio,
       'dimension73': product.marca,
       'dimension74': product.forma_pago}
    );
    console.log("enviando a ga");
  }
  return promotionData;
}

// funciones para pushear eventos click al dataLayer
function promotionClick(promotion, index, mode) {
  promotionData = {
    event: "promotionClick",
    details: promotion,
    path: window.location.pathname,
    position: index,
  };

  if (mode === "dataLayer") {
    dataLayer.push(promotionData);
  } else if (mode === "GA") {
    ga(
      'send', 
      'event', 
      'tagLibrary 2.0', 
      promotionData.event, 
      promotionData.details.name, 
      {'dimension68': product.name, 
       'dimension69': product.description,
       'dimension70': product.type,
       'dimension71': product.promotion,
       'dimension72': product.precio,
       'dimension73': product.marca,
       'dimension74': product.forma_pago}
    );
    console.log("enviando a ga");
  }
  return promotionData;
}

function productClick(product, index, mode) {
  productData = {
    event: "productClick",
    details: product,
    path: window.location.pathname,
    position: index,
  };
  if (mode === "dataLayer") {
    dataLayer.push(productData);
  } else if (mode === "GA") {
    ga(
      'send', 
      'event', 
      'tagLibrary 2.0', 
      productData.event, 
      productData.details.name, 
      {'dimension68': product.name, 
       'dimension69': product.description,
       'dimension70': product.type,
       'dimension71': product.product,
       'dimension72': product.precio,
       'dimension73': product.marca,
       'dimension74': product.forma_pago}
    );
    console.log("enviando a ga");
  }
  return productData;
}

function tagInteraction(tag, mode) {
  var interactionData = {
    event: "interaction",
    detail: {
      tag: tag,
      path: window.location.pathname,
    },
  };
  if (mode === "dataLayer") {
    dataLayer.push(tagData);
  } else if (mode === "GA") {
    ga(
      'send', 
      'event', 
      'tagLibrary 2.0', 
      productData.event, 
      productData.details.name, 
      {'dimension68': product.name, 
       'dimension69': product.description,
       'dimension70': product.type,
       'dimension71': product.product,
       'dimension72': product.precio,
       'dimension73': product.marca,
       'dimension74': product.forma_pago}
    );
    
    console.log("enviando a ga");
  }
  return interactionData;
}
//funcion para guardar datos en el sessionStorage
function saveSessionStorage(key, data) {
  var sessionData = sessionStorage.getItem(key);

  if (sessionData === null) {
    sessionStorage.setItem(key, JSON.stringify([data]));
  } else {
    // pushear objetos en un array
    var valuesTag;
    valuesTag = JSON.parse(sessionStorage.getItem(key));
    valuesTag.push(data);
    sessionStorage.setItem(key, JSON.stringify(valuesTag));
  }
}

// fn para enviar informacion del SessionStorage al dataLayer
function sendSessionStorage(mode) {
  var productSession = sessionStorage.getItem("product");
  var promotionSession = sessionStorage.getItem("promotion");
  var formSession = sessionStorage.getItem("form");
  var tagSession = sessionStorage.getItem("tag");
  var sessionData = {
    event: "sendSessionStorage",
    detail: {
      product: productSession,
      promotion: promotionSession,
      form: formSession,
      tag: tagSession,
      path: window.location.pathname,
    },
  };
  if (mode === "dataLayer") {
    dataLayer.push(sessionData);
  } else if (mode === "GA") {
    ga("send", "event", "tagLibrary 2.0", "sessionData", sessionDadataLayer);
  }
}

function formSend(product, mode) {
  formData = {
    event: "formSend",
    detail: {
      product: product,
      path: window.location.pathname,
    },
  };

  if (mode === "dataLayer") {
    dataLayer.push(formData);
  } else if (mode === "GA") {
    ga("send", "formsend", formData);
  }
  return formData;
}

// ------ flujo 1: Marcage View ------
var sendMode = "GA";
// Push de los Views
tagItems.forEach(function (e, i) {
  var data = JSON.parse(e.dataset.tag);
  var type = data.type;
  var mode = data.mode || sendMode;
  if (type === "product") {
    productImpresion(data, i, mode);
  } else if (type === "promotion") {
    promotionView(data, i, mode);
  }
});

// ------ flujo 2: Marcage Click ------
tagItems.forEach(function (e, i) {
  e.addEventListener("click", function (e) {
    var data = JSON.parse(e.target.dataset.tag);
    var type = data.type;
    var mode = data.mode || sendMode;
    if (type === "product") {
      productClick(data, i, mode);
      saveSessionStorage("product", productData);
    } else if (type === "promotion") {
      promotionClick(data, i, mode);
      saveSessionStorage(type, promotionData);
    }
  });
});
document.addEventListener("unload", sendSessionStorage());

//------ flujo 3: Formulario ------
tagItems.forEach(function (e) {
  e.addEventListener("click", function (e) {
    var data = JSON.parse(e.target.dataset.tag);
    var type = data.type;
    var mode = data.mode || sendMode;
    if (type === "submit") {
      e.preventDefault();
      var product = sessionStorage.getItem("product");
      formSend(product, mode);
      saveSessionStorage("form", formData);
      sendSessionStorage();
      setTimeout(function () {
        sessionStorage.clear();
      }, 2000);
    }
  });
});

//------ flujo 4: Interacciones ------
tagItems.forEach(function (e) {
  e.addEventListener("click", function (e) {
    var data = JSON.parse(e.target.dataset.tag);
    var type = data.type;
    var mode = data.mode || sendMode;
    if (type === "interaction") {
      tagInteraction(data, mode);
      saveSessionStorage("interaction", interactionData);
    }
  });
});

setTimeout(function () {
  sendSessionStorage(sendMode);
}, 2000);
