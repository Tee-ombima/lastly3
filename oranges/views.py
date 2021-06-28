from django.shortcuts import render
from django.http import JsonResponse
from orangeFarmers.models import OrangeFarmer
from .models import Orange
from os import path, pardir, remove

# Create your views here.


def handleAddVehicle(request):

    # get the data sent, post data
    owner = request.POST.get('owner')
    type = request.POST.get('type')
    price = request.POST.get('price')
    maturity_date = request.POST.get('maturity_date')
    model = request.POST.get('model')
    location = request.POST.get('location')
    supplier = request.POST.get('supplier')
    supplier_location = request.POST.get('gear_box')
    grafted = request.POST.get('grafted')
    reported_cases = request.POST.get('reported_cases')

    # get the data sent, files data
    foreground_image = request.FILES['front_image']
    inside_image = request.FILES['inside_image']
    background_image = request.FILES['back_image']

    # fetch the owner
    owner_info = OrangeFarmer.objects.get(id=owner)

    # create the orange
    Orange.objects.create(
        owner=owner_info,
        type=type,
        price=f"Ksh {price}",
        maturity_date=f"{maturity_date}",
        model=model,
        location=location,
        foreground_image=foreground_image,
        inside_image=inside_image,
        background_image=background_image,
        supplier=f"{supplier}",
        supplier_location=supplier_location,
        grafted=grafted,
        reported_cases=reported_cases
    )

    return JsonResponse({
        "message": "Orange has been added successfully"
    })


def deleteVehicle(request):
    vehicle_id = request.POST.get('orange')

    # get the orange first
    orange = Orange.objects.get(id=vehicle_id)
    # get the parent dir
    parent_dir = path.abspath(path.join(path.dirname(__file__), pardir))

    # delete the foreground image
    if(path.exists(parent_dir+"/media/"+str(orange.foreground_image))):
        remove(parent_dir+"/media/"+str(orange.foreground_image))
    # delete the inside image
    if(path.exists(parent_dir+"/media/"+str(orange.inside_image))):
        remove(parent_dir+"/media/"+str(orange.inside_image))
    # delete the foreground image
    if(path.exists(parent_dir+"/media/"+str(orange.background_image))):
        remove(parent_dir+"/media/"+str(orange.background_image))

    # delete the orange from db
    Orange.objects.filter(id=vehicle_id).delete()

    # return a response
    return JsonResponse({
        "message": "Orange deleted successfully"
    })


def updateHiredStatus(request):
    orange = request.POST.get('orange')

    # update the orange hired status
    initial_vehicle = Orange.objects.get(id=orange)
    initial_vehicle.hired = True
    initial_vehicle.save()

    # return a response
    return JsonResponse({
        "message": "Status updated successfully"
    })
