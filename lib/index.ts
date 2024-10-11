import { cookies, headers } from "next/headers";

const { NEXT_PUBLIC_OPENCART_DOMAIN_URL, NEXT_PUBLIC_OPENCART_API_TOKEN } = process.env;

async function fetchAPI(query = '', cache: RequestCache = 'default', variables:any = {}, file:any = false) {
  let sesHeaders, body;

  const xsessionid:any = cookies().get("x-session-id")?.value;
  sesHeaders = new Headers([['x-session-id', xsessionid]]) as any;

  if (file) {
    sesHeaders.delete("Content-Type");
    body = new FormData();
    body.append("operations", JSON.stringify({ query,variables }));
    body.append('map', '{"0":["variables.file"]}');
    body.append("0", file);
  } else {
    sesHeaders.append("Content-Type", "application/json");
    body = JSON.stringify({query,variables,}, null, 2);
  }
  

  try {
    const res: any = await fetch(`${NEXT_PUBLIC_OPENCART_DOMAIN_URL}/index.php?route=api/graphql/usage&token=${NEXT_PUBLIC_OPENCART_API_TOKEN}`, {
      method: 'POST',
      headers: sesHeaders,
      credentials: 'include',
      body,
      cache,
      // next: { revalidate: 60 }
    })

    const json = await res.json();

    if (json?.errors) {
      return json;
      // throw new Error('Failed to fetch API')
    }

    return json.data;
  } catch (e: any) {
    throw new Error(e)
  }

}

export async function addReview(product_id:any, text:any, file:any, rating:any, name:any ) {
  console.log(text);
  
  const data = await fetchAPI(` 
    mutation($file: Upload) {
      addReview(
        product_id: "${product_id}"
        input: { name: "${name}", rating: ${rating}, text: "${text}" }
        files: $file
      )
    }
  `, 'no-store', '"variables":{"file":null}', file);
  
  return data.addReview
}

export async function createSession() {
  const data = await fetchAPI(`
  {
    session(id: "") {
      id
    }
  }
  `, 'no-store',);
  return data?.session?.id
}

export async function getCart() {
  const data = await fetchAPI(`
  {
    cart {
      weight
      tax
      total
      subtotal
      coupon_discount
      coupon_code
      has_stock
      has_shipping
      has_download
      totals {
        code
        title
        value
        sort_order
      }
      items {
        cart_id
        product_id
        name
        model
        shipping
        image
        quantity
        minimum
        price
        total
        reward
        points
        option {
          product_option_id
          option_id
          name
          type
          value
          required
          in_stock
        } 
      }
    }
  }
  `, 'no-store',);
  return data?.cart
}

export async function addItemToCart(product_id: number, quantity: number, options: any) {
  let qty = quantity ? quantity : 1;
  const data = await fetchAPI(`
    mutation {
      addItemToCart(input: {product_id: ${product_id}, quantity: ${qty}, options: [${options}]}) {
        weight
        tax
        total
        subtotal
        coupon_discount
        coupon_code
        has_stock
        has_shipping
        has_download
        totals {
          code
          title
          value
          sort_order
        }
        items {
          cart_id
          product_id
          name
          model
          shipping
          image
          quantity
          minimum
          subtract
          stock
          price
          total
          reward
          points
          tax_class_id
          weight
          weight_class_id
          length
          width
          height
          length_class_id
        }
      }
    }
  `, 'no-store',);

  return data?.addItemToCart
}

export async function removeFromCart(cart_id: any) {
  const data = await fetchAPI(`
    mutation {
      deleteCartItem(cart_id: ${cart_id})
    }
    `, 'no-store',);

  return data?.addItemToCart
}

export async function updateCartItem(cart_id: any, quantity: number) {
  const data = await fetchAPI(`
    mutation {
      updateCartItem(cart_id: ${cart_id}, quantity: ${quantity})
    }  
    `, 'no-store',);

  return data?.addItemToCart
}

export async function updateCart(id: number) {
  const data = await fetchAPI(`
    mutation {
      addItemToCart(input: ) {
        weight
        tax
        total
        subtotal
        coupon_discount
        coupon_code
        has_stock
        has_shipping
        has_download
        totals {
          code
          title
          value
          sort_order
        }
        items {
          cart_id
          product_id
          name
          model
          shipping
          image
          option 
          quantity
          minimum
          subtract
          stock
          price
          total
          reward
          points
          tax_class_id
          weight
          weight_class_id
          length
          width
          height
        }
      }
    }
  `, 'no-store',);

  return data?.addItemToCart
}

export async function getCategories(parent: number = 0) {
  const data = await fetchAPI(`
  {
    categories(parent: ${parent}) {
      category_id
      categories {
        category_id
        name
      }
      parent {
        category_id
      }
      name
      image
      top
      column
      status
      description
      meta_title
      meta_description
      meta_keyword
      products_count
    }
  }
  `);
  return data?.categories
}

export async function getCategory(id: number = 0) {
  const data = await fetchAPI(`
  {
    category(id: ${id}) {
      category_id
      name
      image
      top
      column
      status
      description
      date_added
      date_modified
      meta_title
      meta_description
      meta_keyword
      layout_id
      products_count
      parent {
        category_id
        name
        image
        top
        column
        status
      }
    }
  }
  `);
  return data?.category
}

export async function getProducts(parent: number) {
  const data = await fetchAPI(`
  {
    products(filter_category_id: ${parent} filter_main_color: 1 start: 0 limit: 300) {
      attributes {
        attribute_group_id
        name
        status
        attribute {
          attribute_id
          name
          text
          status
        }
      }
      product_id
      name
      description
      meta_title
      meta_description
      meta_keyword
      tag
      model
      sku
      upc
      mpn
      quantity
      image
      in_stock
      price
      special
      formatted_price
      formatted_special
      weight
      rating
      review_count
      minimum
      sort_order
      status
      wishlist
      images {
        product_image_id
        image
        sort_order
      }
    }
  }
  `);
  return data?.products
}

export async function getOrders(start: number, limit:number) {
  const data = await fetchAPI(`
  {
    orders(start: ${start}, limit: ${limit}) {
      order_id
      products {
        order_product_id
        order_id
        product_id
        name
        model
        quantity
        price
        total
        tax
        reward
      }
      store_url
      customer_id
      firstname
      lastname
      email
      telephone
      fax
      payment_firstname
      payment_lastname
      payment_company
      payment_address_1
      payment_postcode
      payment_city
      payment_method
      payment_code
      shipping_company
      shipping_method
      shipping_code
      comment
      total
      order_status
      commission
      date_added
      date_modified
    }
  }
  `);
  return data?.orders 
}

export async function getOrder(id:number) {
  const data = await fetchAPI(`
  {
    order(id: "${id}") {
      order_id
      invoice_no
      invoice_prefix
      store {
        store_id
        name
        url
        ssl
      }
      products {
        order_product_id
        order_id
        product_id
        name
        model
        quantity
        price
        total
        tax
        reward
      }
      store_name
      store_url
      customer_id
      firstname
      lastname
      email
      telephone
      fax
      custom_field
      payment_firstname
      payment_lastname
      payment_company
      payment_address_1
      payment_address_2
      payment_postcode
      payment_city
      paymentZone {
        zone_id
        name
        code
        status
      }
      paymentCountry {
        country_id
        name
        iso_code_2
        iso_code_3
        address_format
        postcode_required
        status
      }
      payment_custom_field
      payment_method
      payment_code
      shipping_firstname
      shipping_lastname
      shipping_company
      shipping_address_1
      shipping_address_2
      shipping_postcode
      shipping_city
      shippingZone {
        zone_id
        name
        code
        status
      }
      shippingCountry {
        country_id
        name
        iso_code_2
        iso_code_3
        address_format
        postcode_required
        status
      }
      shipping_custom_field
      shipping_method
      shipping_code
      comment
      total
      order_status_id
      order_status
      affiliate_id
      commission
      date_added
      date_modified
    }
  }
  `);
  return data?.order
}

export async function getBestsellerProducts() {
  const data = await fetchAPI(`
    {
      bestsellerProducts(limit: 8) {
        product_id
        name
        price
        formatted_price
        model
        upc
        mpn
        stock_status
        image
      }
    }
  `);
  return data?.latestProducts
}

export async function siteInfo() {
  const data = await fetchAPI(`
    {
      siteInfo {
        phpversion
        mysqlversion
        pluginversion
        siteName
        siteAddress
        siteGeocode
        siteEmail
        sitePhone
        siteLogo
        siteIcon
      }
    }
  `);
  return data?.siteInfo
}

export async function footers() {
  const data = await fetchAPI(`
    {
      footers {
        footer_id
        name
        status
        items {
          title
          link
          image
          sort_order
          footer_image_id
          language_id
        }
      }
    }
  `);
  return data?.footers
}

export async function getlatestProducts() {
  const data = await fetchAPI(`
  {
    latestProducts(limit: 10) {
      product_id
      name
      price
      formatted_price
      discounts {
        price
      }
      special
      formatted_special
      description
      model
      upc
      mpn
      stock_status
      image
    }
  }
  `);
  return data?.latestProducts
}

export async function getProduct(id: number) {
  const data = await fetchAPI(`
    {
      product(id: ${id}) {
        product_id
        name
        description
        meta_title
        meta_description
        meta_keyword
        tag
        model
        sku
        upc
        ean
        jan
        isbn
        mpn
        location
        quantity
        stock_status
        image
        color_image
        in_stock
        price
        special
        formatted_price
        formatted_special
        reward
        points
        tax_class_id
        date_available
        weight
        weight_class_id
        length
        width
        height
        length_class_id
        subtract
        rating
        review_count
        minimum
        status
        viewed
        wishlist
        categories {
          category_id
          name
          meta_title
          meta_description
          meta_keyword
          products_count
        }
        attributes(language_id: 2) {
          attribute_group_id
          name
          attribute {
            attribute_id
            name
            text
            status
          } 
        }
        options {
          product_option_id
          option_id
          name
          type
          value
          required
          in_stock
        }
        discounts {
          product_discount_id
          quantity
          priority
          price
          date_start
          date_end
        }
        images {
          product_image_id
          image
          thumb
          sort_order
        }
        layout_id
      }
    }
  `, 'no-store',);
  return data?.product
}

export async function getProductColors(sku: string) {
  const data = await fetchAPI(`
    {
      productColors(
        sku: "${sku}"
      ) {
        product_id
        name
        model
        sku
        color_image
        price
        special
        formatted_price
        formatted_special
        minimum
        sort_order
        status
      }
    }
  `, 'no-store',);
  return data?.productColors
}

export async function availableOptions(id: number) {
  const data = await fetchAPI(`
  {
    availableOptions(product_id: ${id}) {
      product_option_id
      product_option_value {
        product_option_value_id
        option_value_id
        name
        image
        quantity
        subtract
        price
        price_prefix
        weight
        weight_prefix
        in_stock
      }
      option_id
      name
      type
      value
      required
      in_stock
    }
  }
  `, 'no-store',);
  return data?.availableOptions
}

export async function relatedProducts(id: number) {
  const data = await fetchAPI(`
    {
      relatedProducts(id: ${id}) {
        product_id
        name
        description
        meta_title
        meta_description
        meta_keyword
        tag
        model
        sku
        upc
        ean
        jan
        isbn
        mpn
        location
        quantity
        stock_status
        image
        in_stock
        price
        special
        formatted_price
        formatted_special
        reward
        points
        tax_class_id
        date_available
        weight
        weight_class_id
        length
        width
        height
        length_class_id
        subtract
        rating
        review_count
        minimum
        sort_order
        status
        date_added
        date_modified
        viewed
        wishlist
        categories {
          category_id
          name
          image
          top
          column
          status
        }
        discounts {
          product_discount_id
          quantity
          priority
          price
          date_start
          date_end
        }
        images {
          product_image_id
          image
          sort_order
        }
      }
    }
  `, 'no-store',);
  return data?.relatedProducts
}

export async function getInformations() {
  const data = await fetchAPI(`
  {
    informations {
      information_id
      top_menu
      bottom
      status
      title
    }
  }
  `);
  return data?.informations
}

export async function getLocations() {
  const data = await fetchAPI(`
  {
    locations {
      location_id
      name
      address
      telephone
      fax
      geocode
      image
      open
      comment
    }
  }
  `);
  return data?.locations
}

export async function getInformationPage(id: number) {
  const data = await fetchAPI(`
    {
      information(id: "${id}") {
        information_id
        bottom
        sort_order
        status
        title
        description
        meta_title
        meta_description
        meta_keyword
      }
    }
  `);
  return data?.information
}

export async function searchProduct(search:any) {
  const data = await fetchAPI(`
    {
      products(
        filter_name: "${search}"
        filter_description: "false"
        start: 0
        limit: 300
      ) {
          product_id
          name
          description
          meta_title
          meta_description
          meta_keyword
          tag
          model
          sku
          upc
          mpn
          quantity
          image
          in_stock
          price
          special
          formatted_price
          formatted_special
          weight
          rating
          review_count
          minimum
          sort_order
          status
          wishlist
          images {
            product_image_id
            image
            sort_order
          }
      }
    }
  `);
  return data?.products
}

export async function LogIn(email: string, password: string) {
  const data = await fetchAPI(`
    mutation {
      login(email: "${email}", password: "${password}")
    }
  `, 'no-store',);

  return data?.login
}

export async function logOut() {
  const data = await fetchAPI(`
    mutation {
      logout
    }
  `, 'no-store',);

  return data?.logout
}

export async function editPassword(password: string, confirm: string) {
  const data = await fetchAPI(`
    mutation {
      editPassword(password: "${password}", confirm: "${confirm}")
    }
  `, 'no-store',);
  
  return data
}

export async function editCustomer(firstname: string, lastname: string, email:string, telephone:string) {
  const data = await fetchAPI(`
    mutation {
      editCustomer(
        input: {
          firstname: "${firstname}"
          lastname: "${lastname}"
          email: "${email}"
          telephone: "${telephone}"
          fax: ""
        }
      )
    }  
  `, 'no-store',);
  
  return data
}

export async function loggedIn() {
  const data = await fetchAPI(`
    {
      loggedIn {
        customer_id
        customer_group {
          customer_group_id
        }
        firstname
        lastname
        email
        telephone
        salt
        cart
        wishlist
        newsletter
        address_id
        custom_field
        ip
        status
        approved
        safe
        token
        code
        date_added
      }
    }
  `, 'no-store',);
  return data?.loggedIn
}

export async function getBanners(layout: string,position:string) {
  const data = await fetchAPI(`
    {
      banners(layout: "${layout}" position: "${position}") {
        banner_id
        name
        status
        banner_image_id
        language_id
        title
        link
        image
        width
        height
      }
    }
  `);
  return data?.banners
}

export async function getAddresses() {
  const data = await fetchAPI(` 
  {
    addresses {
      address_id
      firstname
      lastname
      company
      address_1
      address_2
      postcode
      city
      zone {
        zone_id
        name
        code
        status
      }
      country {
        country_id
        name
        iso_code_2
        iso_code_3
        address_format
        postcode_required
        status
      }
      custom_field
    }
  }
  `);
  return data?.addresses
}

export async function getShippingMethods() {
  const data = await fetchAPI(` 
  {
    shippingMethods {
      code
      title
      quote {
        code
        title
        cost
        text
        details
        description
      }
      sort_order
      error
    }
  }
  `, 'no-store');
  return data?.shippingMethods
}

export async function getPaymentMethods() {
  const data = await fetchAPI(` 
  {
    paymentMethods {
      code
      title
      quote {
        code
        title
        cost
        text
        details
        description
      }
      sort_order
      error
    }
  }
  `, 'no-store');
  return data?.paymentMethods
}

export async function reviews(product_id:number) {
  const data = await fetchAPI(` 
  {
    reviews(product_id: "${product_id}", start: 0, limit: 3) {
      review_id
      author
      rating
      text
      date_added
      upload_name
      filename
      code
      file_type
    }
  }
  `);
  return data?.reviews
}

export async function addOrder(firstName:string, phone:string, note:string) {
  const data = await fetchAPI(`
    mutation {
      addOrder(
        input: {
          firstname: "${firstName}"
          lastname: ""
          email: ""
          telephone: "${phone}"
          comment: "${note}"
          fax: ""
          payment_firstname: "${firstName}"
          payment_lastname: ""
          payment_company: ""
          payment_address_1: ""
          payment_address_2: ""
          payment_city: ""
          payment_postcode: ""
          payment_country: ""
          payment_zone: ""
          payment_address_format: ""
          payment_method: ""
          payment_code: ""
          shipping_firstname: "${firstName}"
          shipping_lastname: ""
          shipping_company: ""
          shipping_address_1: ""
          shipping_address_2: ""
          shipping_city: ""
          shipping_postcode: ""
          shipping_country: ""
          shipping_zone: ""
          shipping_address_format: ""
          shipping_method: ""
          shipping_code: ""
          payment_country_id: ""
          payment_zone_id: ""
          shipping_country_id: ""
          shipping_zone_id: ""
        }
      )
    }
  `, 'no-store',);
  
  return data?.addOrder
}

export async function confirmOrder() {
  const data = await fetchAPI(`
    mutation {
      confirmOrder {
        products {
          cart_id
          product_id
          name
          model
          option {
            name
            option_id
            product_option_id
            type
            value
          }
          recurring
          quantity
          subtract
          price
          total
          href
        }
        coupon
        totals {
          title
          text
        }
        payment
      }
    }
  `, 'no-store',);
  
  return data?.confirmOrder
}

export async function orderSuccess() {
  const data = await fetchAPI(`
    mutation {
      OrderSuccess
    }
  `, 'no-store',);
  
  return data.OrderSuccess
}

export async function PaymentRbs(order_id:string) {
  const data = await fetchAPI(`
    mutation {
      Payment_Rbs(input: "${order_id}")
    }
  `, 'no-store',);
  
  return data.Payment_Rbs
}

export async function PaymentCod() {
  const data = await fetchAPI(`
    mutation {
      Payment_Cod
    }
  `, 'no-store',);
  
  return data.Payment_Cod
}

export async function addCoupon(code:string) {
  const data = await fetchAPI(`
  mutation {
    addCoupon(code: "${code}") {
      weight
      tax
      total
      subtotal
      coupon_discount
      coupon_code
      has_stock
      has_shipping
      has_download
      totals {
        code
        title
        value
        sort_order
      }
    }
  }
  `, 'no-store',);
  
  return data?.addCoupon
}

export async function setPaymentMethod(code:string, comment:string = '') {
  const data = await fetchAPI(`
    mutation {
      setPaymentMethod(code: "${code}", comment: "${comment}", agree: 1)
    }
  `, 'no-store',);
  
  return data.setPaymentMethod
}

export async function setShippingMethod(code:string) {
  const data = await fetchAPI(`
    mutation {
      setShippingMethod(code: "${code}")
    }
  `, 'no-store',);
  
  return data.setPaymentMethod
}

export async function register(params:any) {
  const {firstname, lastname, email, phone, password, address, postcode, city} = params;
  
  const data = await fetchAPI(`
    mutation {
      register(
        input: {
          customer_group_id: 1
          firstname: "${firstname}"
          lastname: "${lastname}"
          email: "${email}"
          telephone: ${phone}
          address_1: "${address}"
          address_2: ""
          country_id: 176
          zone_id: 0
          city: "${city}"
          password: "${password}"
          confirm: "${password}"
          agree: true
          fax: ""
          company: ""
          postcode: "${postcode}"
        }
      )
    }
  `, 'no-store',);
  
  return data
}

export async function addAddress(params:any) {
  const {firstname, lastname, address_1, city} = params;
  
  const data = await fetchAPI(`
    mutation {
      addAddress(
        input: {
          firstname: "${firstname}"
          lastname: "${lastname}"
          company: ""
          address_1: "${address_1}"
          address_2: ""
          postcode: ""
          city: "${city}"
          custom_field: ""
          zone_id: 0
          country_id: 176
        }
      )
    }
  `, 'no-store',);
  
  return data.addAddress
}

export async function editAddress(params:any) {
  const {firstname, lastname, address_1, city, address_id} = params;
  
  const data = await fetchAPI(`
    mutation {
      editAddress(
        address_id: "${address_id}"
        input: {
          firstname: "${firstname}"
          lastname: "${lastname}"
          company: ""
          address_1: "${address_1}"
          address_2: ""
          postcode: ""
          city: "${city}"
          custom_field: ""
          country_id: 176
          zone_id: 0
        }
      )
    }
  `, 'no-store',);
  
  return data.editAddress
}

export async function preorder(name:string, email:string, product_id:number) {
  const data = await fetchAPI(` 
    mutation {
      preorder(name: "${name}", email: "${email}", product_id: ${product_id})
    }
  `, 'no-store',);
  
  return data.preorder
}