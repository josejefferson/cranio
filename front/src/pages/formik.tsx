// import { Formik, Form, FastField, ErrorMessage, FieldArray } from 'formik'
// import FastInputField from '@/components/FastInputField'

const DataForm = () => (
  <>
    {/* <h1>Your Data</h1>
    <Formik
      initialValues={{ name: '', email: '', acceptedTerms: false, todo: [{ title: 'aaa' }, { title: 'bbb' }] }}
      onSubmit={(values, { setSubmitting }) => {
        // post data to server
        alert(JSON.stringify(values, null, 2))
      }}
    >
      {({ isSubmitting, dirty, handleReset, values }) => (
        <Form>
          <div>
            <span>{Date.now()}</span>
            <label>
              Name
              <FastInputField type="text" name="name" />
            </label>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <FastInputField type="email" name="email" />
          </div>
          <div>
            <label>Accept terms</label>
            <FastInputField type="checkbox" name="acceptedTerms" />
          </div>
          <FieldArray name="todo" render={(array) => (
            <>
            
              {values.todo.map((todo, i) => (
                <>
                <FastField name={`todo.${i}.title`}/>
                <button type="button" onClick={() => array.remove(i)}>(X)</button>
                </>
              ))}
              <button type="button" onClick={() => array.push({title:''})}>+ PUSH +</button>
            </>
          )} />
          <button
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
          <button type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik> */}
  </>
)

export default DataForm