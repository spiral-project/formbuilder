# Daybed Formbuilder

A form builder is the tool you're using to generate forms so that users can
then enter data trough them. One good example of form builder is google forms.

This one allows to store data into a [Daybed](http://daybed.io) server.
This is good because then you can own your copy of the data, and interact with
this data using the awesome Daybed HTTP APIs.

We've also made it possible to store the data into any other backend
without having to touch any other code than the backend itself.

For that, we are using React.js as it allows us to keep things separated in
a clear and nice way.

## How to install it locally?

If you want to work with the formbuilder, or hack on it, then you'll need to
install it. To do so, run the following commands:

    $ npm install
    $ npm start

… and you should see your favorite browser open with the app running for you.


## Architecture of the app

Here are some notes about the overall design we're using for this form builder.

### How the components work together?

Here is an overview of how the react components work together:

    <FormEditor>
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
    </FormEditor>

There is also a `<FormReport>` component, used to display a report of all the
data that was filled by users

### What's the data flow?

In traditional React fashion, we're using Flux to dispatch the actions,
meaning that each of our root components contains a reference to a store where
the data remains. For instance, the FormEditor component is connected to the
FieldElements store, which is being called each time an element is added,
edited or deleted from the app.

When an action takes place, it's done on the store itself, which will update
its content and ask all the dependent elements to re-render.

              ———| Action |<——— triggers ———
     updates |                              |
              ——>| Store | — updates ——> | App | ——> | Component2 |
                                            |
                                             ——————> | Component2 |

### I want to follow development!

Cool, have a look at [the
pad](http://pad.spiral-project.org/p/daybed-formbuilder) for the big overview.

We're using github issues to track the project issues / bugs. Pkease do open
new tickets in case you feel something can be improved or needs to be fixed.

## Credits

The original inspiration for the theme was provided by Cocoon Development Ltd,
which released the code behind http://www.former.io/ code under an MIT licence
just for us.

We re-wrote all the logic behind the code to use react in order to have
something easier to maintain, but the original design idea is theirs.
