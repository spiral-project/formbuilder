# Daybed Formbuilder

The orginal motivation behind daybed was to replace Google Forms, and for
that, appart from the storage and validation service (what Daybed is), we
are in need of a form builder.

## A form builder ?

A form builder is the tool you're using to generate forms so that users can
then enter data trough them.

For that, we are using React.js as it allows us to keep things separated in
a clear and nice way.

## How to install it locally?

If you want to work with the formbuilder, or hack on it, then you'll need to
install it. To do so, it's easy:

    $ npm install
    $ npm start

… and you should see your favorite browser open with the app running there for
you.


## Design

Here are some notes about the overall design we're using for this form builder.

### How the components work together?

Here is an overview of how the react components work together:

    <FormBuilderApp>
      <FieldList />
      <FormHeader />
      <FormContainer>
        <FormElement>
          <TextAreaEditor />
          <TextAreaRenderer />
        </FormElement>
        <FormElement>
          <CheckboxesEditor />
          <CheckboxesRenderer />
        </FormElement>
      </FormContainer>
    </FormBuilderApp>

### What's the data flow?

We're using Flux to dispatch the actions, meaning that the FormBuilderApp
contains a reference to a store where we store all the form elements that
had been added / configured to the app.

When an action takes place, any of the elements can trigger it and it will
update the data, and the elements will be re-rendered.

              ———| Action |<——— triggers ———
     updates |                              |
              ——>| Store | — updates ——> | App |


## Credits

The theme was provided by Cocoon Development Ltd, which released the code
behind http://www.former.io/ code under an MIT licence.

We rewrote all the logic behind the code to use react in order to have
something easier to maintain.
