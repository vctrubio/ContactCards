# Django reptetive taks

python manage.py runserver

## root dir setting app

- INSTALLED_APPS setting in your settings.py file
- urls view for / model
  -path(x, include, name)
- model must have url

in the backend

- model declaration
- serializer
- django rest framework

## setting up organisation.cards

- Organisation serializer to import CardSerialzer
- create a variable cards in Orgnaisation Serliazer(many=True, read_only=True, source='card_set')
  - this creates default reverse relationship name that Django automatically creates for a ForeignKey relationship.



## what is the manage file?
