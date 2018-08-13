export const Config = {
  layout: 'tabs',
  sections: [
    {
      label: 'Section 1',
      rows: [
        {
          fields: [
            {
              name: 'SelectBox1',
              type: 'select',
              label: 'Select 1 Label',
              options: [
                {
                  label: 'Option 1',
                  value: 'opt_1'
                },
                {
                  label: 'Option 2',
                  value: 'opt_2'
                },
                {
                  label: 'Option 3',
                  value: 'opt_3'
                }
              ]
            }
          ]
        },
        {
          fields: [
            {
              name: 'TestField1',
              type: 'text',
              label: 'Text Field 1 Label',
            }
          ]
        }
      ]
    },
    {
      label: 'Section 2',
      rows: [
        {
          fields: [
            {
              name: 'TestField 2.1',
              type: 'text',
              label: 'Text Field 2.1 Label',
            }
          ]
        },
        {
          fields: [
            {
              name: 'TestField 2.2',
              type: 'text',
              label: 'Text Field 2.2 Label',
            }
          ]
        }

      ]
    }
  ]
};
