import sys
import logging
import structlog
from structlog.contextvars import merge_contextvars
from .config import settings

LOG_LEVEL_MAPPING = {
    "CRITICAL": 50,
    "FATAL": 50,
    "ERROR": 40,
    "WARNING": 30,
    "WARN": 30,
    "INFO": 20,
    "DEBUG": 10,
    "NOTSET": 0,
}

def setup_logging():
    '''Setup the logging configuration. 

    Returns:
        The default logger instance.

    Note: Logs before this function is called will not be formatted correctly.
        Logging is in JSON format unless DEBUG is true.
    '''
    logging.basicConfig(
        format="%(message)s",
        stream=sys.stdout,
        level=LOG_LEVEL_MAPPING[settings.LOG_LEVEL],
    )


    processors = [
            structlog.stdlib.filter_by_level,
            structlog.stdlib.add_logger_name,
            structlog.stdlib.add_log_level,
            structlog.stdlib.PositionalArgumentsFormatter(),
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.StackInfoRenderer(),
            structlog.processors.format_exc_info,
            structlog.processors.UnicodeDecoder(),
            merge_contextvars,
            # if debug is true, use the console renderer for local development
            # otherwise use the json renderer
            structlog.dev.ConsoleRenderer() if settings.DEBUG else structlog.processors.JSONRenderer()
        ]

    structlog.configure(
        processors=processors,
        logger_factory=structlog.stdlib.LoggerFactory(),
        wrapper_class=structlog.stdlib.BoundLogger,
        cache_logger_on_first_use=True,
    )

    return structlog.get_logger("default")

logger = setup_logging() 