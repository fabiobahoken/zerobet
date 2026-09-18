#!/bin/bash
# Wrapper that ignores SIGHUP / SIGTERM from session teardown
trap '' HUP
trap '' TERM
exec bun /home/z/my-project/mini-services/chat-service/index.ts
