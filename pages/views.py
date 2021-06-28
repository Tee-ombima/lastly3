from django.http.response import BadHeaderError
from django.shortcuts import render
from orangeFarmers.models import OrangeFarmer
from oranges.models import Orange
from django.http import JsonResponse
import json
from django.forms.models import model_to_dict
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models.fields.files import ImageFieldFile
from django.core import serializers
from django.core.mail import send_mail

# serializers


class ExtendedEncoder(DjangoJSONEncoder):
    def default(self, o):
        if isinstance(o, ImageFieldFile):
            return str(o)
        else:
            return super().default(o)


# home page


def index(request):
    # get all the oranges
    oranges = Orange.objects.all()
    # context
    context = {
        "oranges": oranges
    }
    return render(request, 'pages/home.html', context)

# oranges page


def oranges(request):
    # get all oranges
    oranges = Orange.objects.all()
    vehicles_json = serializers.serialize('json', oranges)
    # context
    context = {
        "oranges": oranges,
        "vehicles_json": json.dumps(vehicles_json)
    }
    return render(request, 'pages/oranges.html', context)

# orange page


def orange(request, id):
    # get the orange
    orange = Orange.objects.get(id=id)
    # context
    context = {
        "orange": orange
    }
    return render(request, 'pages/orange.html', context)
# about us page


def aboutUs(request):
    return render(request, 'pages/about-us.html')
# contact us page


def contactUs(request):
    return render(request, 'pages/contact-us.html')

# logic behind the contact us page


def handleContactUs(request):
    # get the data
    name = request.POST.get('name')
    email = request.POST.get('email')
    subject = request.POST.get('subject')
    message = request.POST.get('message') + " " + f". From {name}"

    try:
        send_mail(
            subject,
            message,
            email,
            ['elvisorono12@gmail.com'],
            fail_silently=False
        )
        return JsonResponse({
            "message": "Inquiry sent successfully"
        })
    except BadHeaderError:
        return JsonResponse({
            "message": "An error occurred"
        })

# login page


def authLogin(request):
    return render(request, 'pages/auth/login.html')
# signup page


def authSignup(request):
    return render(request, 'pages/auth/signup.html')
# dashboard page


def dashboard(request):
    return render(request, 'pages/dashboard.html')

# profile info page


def getProfileInfo(request):
    # get car owner info
    car_owner = OrangeFarmer.objects.get(id=request.POST.get('carOwner'))

    car_owner = model_to_dict(car_owner)

    return JsonResponse(car_owner, encoder=ExtendedEncoder)

# profile oranges


def getProfileVehicles(request):
    # get car owner info first
    car_owner = OrangeFarmer.objects.get(id=request.POST.get('carOwner'))

    # get the oranges
    oranges = Orange.objects.filter(owner=car_owner)

    vehicles_json = serializers.serialize("json", oranges)
    vehicles_data = json.loads(vehicles_json)

    return JsonResponse({
        "oranges": vehicles_data
    })

# logout


def logout(request):
    return render(request, 'pages/auth/logout.html')
