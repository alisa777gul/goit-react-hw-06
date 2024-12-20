import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import style from './ContactForm.module.css';
import { nanoid } from 'nanoid/non-secure';
import { addContact } from '../../redux/contactsSlice';

export default function ContactForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      addContact({
        id: nanoid(),
        name: values.name,
        number: values.number,
      })
    );
    resetForm();
  };

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    number: Yup.string()
      .min(9, 'Too Short!')
      .max(10, 'Too Long!')
      .required('Required')
      .matches(
        /^\d{3}-\d{2}-\d{2}$|^\d{3} \d{2} \d{2}$/,
        'Phone number must be in the format XXX-XX-XX or XXX XX XX'
      ),
  });

  const nameFieldId = useId();
  const numberFieldId = useId();

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={style.form}>
        <div className={style.boxInput}>
          <label className={style.label} htmlFor={nameFieldId}>
            Name
          </label>
          <Field
            className={style.input}
            type="text"
            name="name"
            id={nameFieldId}
            placeholder="Alexa"
          />
          <ErrorMessage className={style.error} name="name" component="span" />
        </div>

        <div className={style.boxInput}>
          <label className={style.label} htmlFor={numberFieldId}>
            Phone number
          </label>
          <Field
            className={style.input}
            type="tel"
            name="number"
            id={numberFieldId}
            placeholder="999-99-99 or 999 99 99"
          />
          <ErrorMessage
            className={style.error}
            name="number"
            component="span"
          />
        </div>

        <button type="submit" className={style.button}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
