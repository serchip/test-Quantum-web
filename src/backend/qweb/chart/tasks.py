from __future__ import absolute_import, unicode_literals
import random
import time
import channels.layers
from asgiref.sync import async_to_sync

from celery import shared_task

import qboard
import numpy as np



@shared_task
#@app.task
def add(x, y):
    channel_layer = channels.layers.get_channel_layer()
    async_to_sync(channel_layer.group_send)('chat_test', {'message': f'{x},{y}', 'type': 'chat_message'})
    return x + y

@shared_task
def cart_energy():
    channel_layer = channels.layers.get_channel_layer()
    size = 40
    Q = np.random.rand(size, size) - 0.5

    async_to_sync(channel_layer.group_send)('chat_test',
                                            {'message': f'{time.time()},0', 'type': 'chat_message'})
    solver = qboard.solver(mode="bf")

    def cb(dic):
        if dic["cb_type"] == qboard.constants.CB_TYPE_NEW_SOLUTION:
            energy = dic["energy"]
            spins = dic["spins"]
            async_to_sync(channel_layer.group_send)('chat_test', {'message': f'{time.time()},{energy}', 'type': 'chat_message'})
            print("New solution found, energy %f, result vector %s" % (energy, spins))
        if dic["cb_type"] == qboard.constants.CB_TYPE_INTERRUPT_TIMEOUT:
            print("Solver interrupted by timeout")
        if dic["cb_type"] == qboard.constants.CB_TYPE_INTERRUPT_TARGET:
            print("Solver interrupted by target")
    spins, energy = solver.solve_qubo(Q,  callback=cb, timeout=5, verbosity=0)