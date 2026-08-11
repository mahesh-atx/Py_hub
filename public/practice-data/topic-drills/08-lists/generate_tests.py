#!/usr/bin/env python3
import os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from _common import build
from _data import TOPICS

TOPIC_ID = int("08-lists"[:2])
folder = os.path.dirname(os.path.abspath(__file__))
_tid, topics_list, questions = TOPICS[TOPIC_ID]
build(folder, TOPIC_ID, questions, topics_list)
