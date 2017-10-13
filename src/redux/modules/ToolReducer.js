import {INIT_APP} from "../actions/types";

const INITIAL_STATE = {
  toolGroups: [],
  tools: [
    {
    id: 0,
    title: 'Müşteri Adı',
    group: 'customer',
    type: 'customer_name',
    w: 350,
    h: 25,
    properties: {
      align: 'left',
      colors: {
        foreColor: '#000',
        backColor: '#fff',
      },
      font: {
        size: 12,
        family: 'Tahoma',
        bold: false,
        italic: false,
        underline: false,
      },
      content: 'Müşteri Ünvanı Tasarım Reklam LTD. ŞTİ.',
    },
  },
    {
      id: 1,
      title: 'Müşteri Telefon No',
      group: 'customer',
      type: 'customer_phone',
      w: 150,
      h: 25,
      properties: {
        content: '0555 111 1111',
      },
    },
    {
      id: 2,
      title: 'Müşteri Adresi',
      group: 'customer',
      w: 150,
      h: 25,
      type: 'customer_address',
      properties: {
        align: 'left',
        content: 'Müşteri Adresi',
      },
    },

    {
      id: 3,
      title: 'Fatura Adı',
      group: 'invoice',
      type: 'invoice_name',
      w: 150,
      h: 25,
      properties: {
        align: 'left',
        content: 'Fatura Başlığı',
      },
    },
    {
      id: 4,
      title: 'Fatura No',
      group: 'invoice',
      type: 'invoice_no',
      w: 150,
      h: 25,
      properties: {
        align: 'left',
        content: '#11111111#',
      },
    },
    {
      id: 5,
      title: 'Fatura Adresi',
      group: 'invoice',
      type: 'invoice_address',

      w: 150,
      h: 25,
      properties: {
        align: 'left',
        content: 'Fatura Adresi',
      },
    },
    {
      id: 6,
      title: 'Ürün/Hizmet Tablosu',
      group: 'product',
      type: 'table',
      elementType: 'table',
      w: 500,
      h: 500,
      columns: [
        {
          id: 'title',
          title: 'Ürün veya Hizmet Adı',
          value: 'Deneme Ürünü',
          show: true,
          type: 'name',
          order: 1,
          properties: {
            font: 'Tahoma',
            size: 11,
            align: 'left',
            bold: true,
            italic: false,
            underline: false
          }
        },
        {
          id: 'price',
          type: 'price',
          title: 'Ürün Fiyat Bilgisi',
          value: '7.20 TL',
          show: true,
          order: 0,
        },
        {
          id: 'test',
          type: 'test',
          title: 'Ürün test bilgisi',
          value: 'test',
          show: false,
          order: 2,
        },
      ],
      properties: {
        align: 'left',
        border: false,
        zebra: false,
        zebraStyle: {
          color1: '#eee',
          fontColor1: '#333',
          color2: '#fff',
          fontColor2: '#333',
        },
        borderStyle: {
          color: '#fff',
          style: 'solid',
          size: 'thin',
        },
        header: {
          backColor: '#fff',
          foreColor: '#000',
          font: 'Tahoma',
          size: 11
        },
        columns: {}

      },
    },
    {
      id: 7,
      title: 'Yazı Kutusu',
      group: 'special',
      type: 'special_text',
      w: 350,
      h: 25,
      properties: {
        changeable: true,
        align: 'left',
        colors: {
          foreColor: '#000',
          backColor: '#fff',
        },
        font: {
          size: 12,
          family: 'Tahoma',
          bold: false,
          italic: false,
          underline: false,
        },
        content: 'Özel Yazı Alanı',
      },
    },
  ]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_APP:
      return {
        tools: action.payload.tools,
        toolGroups: action.payload.toolGroups,
      };
    default:
      return state;
  }
};
