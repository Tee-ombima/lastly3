from django.shortcuts import render
from django.http import JsonResponse
from .models import OrangeFarmer
from django.contrib.auth.hashers import make_password, check_password
import json
# Create your views here.

# Login section


def handleLogin(request):
    # get the data sent
    email = request.POST.get('email')
    password = request.POST.get('password')

    # check if email account exists
    try:
        account_exists = OrangeFarmer.objects.get(email=email)
        # compare the password
        isPassword = check_password(password, account_exists.password)

        if isPassword is False:
            return JsonResponse({
                "error": "Password mismatch"
            })
        else:
            # send the id for storage
            id = account_exists.id
            return JsonResponse({
                "carOwner": id
            })
    except OrangeFarmer.DoesNotExist:
        return JsonResponse({
            "error": "Account does not exist"
        })


def handleSignup(request):
    # get the data sent
    name = request.POST.get('name')
    email = request.POST.get('email')
    phone_number = request.POST.get('phone_number')
    location = request.POST.get('location')
    profile_picture = request.FILES['profile_picture']
    password = request.POST.get('password')

    # start by checking if the acc exists
    try:
        OrangeFarmer.objects.get(email=email)
        # send an error
        return JsonResponse({
            "error": "Account already exists"
        })
    except OrangeFarmer.DoesNotExist:
        # hash the password
        hashed_password = make_password(password=password)
        # create the car owner
        car_owner = OrangeFarmer.objects.create(
            name=name,
            email=email,
            phone=phone_number,
            location=location,
            profile_picture=profile_picture,
            password=hashed_password
        )

        # get the id to be set to local storage
        id = car_owner.id
        return JsonResponse({
            "carOwner": id
        })
